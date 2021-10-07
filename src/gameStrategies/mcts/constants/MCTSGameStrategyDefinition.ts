import type { GameConfig } from '../../../gameDefinition/types/GameConfig';
import type { GameDefinition } from '../../../gameDefinition/types/GameDefinition';
import type { GameState } from '../../../gameDefinition/types/GameState';
import type { GameStrategyDefinition } from '../../../gameStrategyDefinition/types/GameStrategyDefinition';
import { indexOfMaxItem } from '../../../generalPurpose/functions/indexOfMaxItem';
import { indicesOfItemsWhere } from '../../../generalPurpose/functions/indiciesOfItemsWhere';
import { randomItem } from '../../../generalPurpose/functions/randomItem';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { getMCTSStateMemory } from '../functions/getMCTSStateMemory';
import { getMCTSStateUCT } from '../functions/getMCTSStateUCT';
import { updateMCTSStateMemory } from '../functions/updateMCTSStateMemory';
import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';

function select(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  startState: GameState<JsonObject, JsonObject>,
  memory: MCTSGameStrategyMemory | undefined,
  actionPerformed: (resultState: GameState<JsonObject, JsonObject>) => void,
): GameState<JsonObject, JsonObject> | null {
  let currentState = startState;
  while (!currentState.gameResult) {

    const actions = gameDefinition.getLegalActions(currentState, gameConfig);
    if (actions.length === 0) {
      // console.log('[select] no legal actions');
      break; // no legal actions; treat as terminal
    }

    const currentStateMemory = getMCTSStateMemory(gameDefinition, gameConfig, currentState, memory);
    if (!currentStateMemory) {
      // Expand
      const action = randomItem(actions);
      const actionState = gameDefinition.getStateAfterAction(action, currentState, gameConfig);
      // console.log('[select] no current state memory; expanding', action, actionState);
      return actionState;
    }
    
    const actionStates = actions.map(action =>
      gameDefinition.getStateAfterAction(action, currentState, gameConfig));
    const stateMemories = actionStates.map(actionState =>
      getMCTSStateMemory(gameDefinition, gameConfig, actionState, memory));
    const logParentStateVisits = Math.log(currentStateMemory.visits);
    const ucts = stateMemories.map(stateMemory =>
      stateMemory ? getMCTSStateUCT(stateMemory, logParentStateVisits) : null);

    const unvisitedIndices = indicesOfItemsWhere(ucts, uct => uct === null);
    if (unvisitedIndices.length > 0) {
      // Expand
      const unvisitedIndex = randomItem(unvisitedIndices);
      const actionState = actionStates[unvisitedIndex];
      // console.log('[select] unvisited actions; expanding', actionState);
      return actionState;
    }

    const maxUCTIndex = indexOfMaxItem(ucts, uct => uct);
    if (maxUCTIndex === null) {
      // console.warn('[select] max UCT index is null');
      break; // shouldn't happen, since legal actions exist; treat as terminal
    }

    // console.log(`[select] maxUCTIndex: ${maxUCTIndex}`);

    currentState = gameDefinition.getStateAfterAction(actions[maxUCTIndex], currentState, gameConfig);

    // console.log('[select] action performed', currentState);
    actionPerformed(currentState);
  }
  // console.log('[select] returning null');
  return null;
}

function simulate(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  startState: GameState<JsonObject, JsonObject>,
): GameState<JsonObject, JsonObject> {
  let currentState = startState;
  while (!currentState.gameResult) {
    const actions = gameDefinition.getLegalActions(currentState, gameConfig);
    if (actions.length === 0) {
      break; // no legal actions; treat as terminal
    }

    currentState = gameDefinition.getStateAfterAction(randomItem(actions), currentState, gameConfig);
  }
  return currentState;
}

function thinkOnce(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  gameState: GameState<JsonObject, JsonObject>,
  memory: MCTSGameStrategyMemory | undefined,
): MCTSGameStrategyMemory | undefined {
  let nextMemory = memory;

  const playout: GameState<JsonObject, JsonObject>[] = [gameState];

  // Select
  const expansionState = select(gameDefinition, gameConfig, gameState, memory, (resultState) => playout.push(resultState));
  // console.log('[thinkOnce] playout after select', playout);
  
  // Expand
  if (expansionState) {
    // console.log(`expansionState`, expansionState)
    playout.push(expansionState);
  }
  // console.log('[thinkOnce] playout after expand', playout);

  // Simulate
  const terminalState = expansionState
    ? simulate(gameDefinition, gameConfig, expansionState)
    : playout[playout.length - 1];
  // console.log('[thinkOnce] terminal state', terminalState);

  // Backprop
  const valueForPlayer = gameConfig.players.map((_, playerIndex) =>
    gameDefinition.valueForPlayerIndex(playerIndex, terminalState, gameConfig));
  // console.log('[thinkOnce] value for player array', valueForPlayer);
  
  for (let i = playout.length - 1; i >= 0; i--) {
    const state = playout[i];
    const stateKey = gameDefinition.getStateKey(state, gameConfig);
    const value = valueForPlayer[state.currentPlayerIndex];
    // console.log(`[thinkOnce] value for state ${stateKey}: ${value}`);
    nextMemory = updateMCTSStateMemory(nextMemory, stateKey, (stateMemory) => ({
      visits: stateMemory.visits + 1,
      wins: stateMemory.wins + value,
    }));
  }

  return nextMemory;
}

function think(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  gameState: GameState<JsonObject, JsonObject>,
  memory: MCTSGameStrategyMemory | undefined,
): MCTSGameStrategyMemory | undefined {
  let nextMemory = memory;
  for (let i = 0; i < 100; i++) {
    // console.log(`think iteration: ${i}`);
    // if (i % 100 === 99) {
    //   console.log(`think iteration: ${i}`);
    // }
    nextMemory = thinkOnce(gameDefinition, gameConfig, gameState, nextMemory);
  }
  return nextMemory;
}

function choose(
  gameDefinition: GameDefinition<JsonObject, JsonObject, JsonObject, JsonObject>,
  gameConfig: GameConfig<JsonObject>,
  gameState: GameState<JsonObject, JsonObject>,
  memory: MCTSGameStrategyMemory | undefined,
): JsonObject | undefined {
  const actions = gameDefinition.getLegalActions(gameState, gameConfig);
  if (actions.length === 0) {
    // console.log('no legal actions');
    return undefined;
  }

  const gameStateMemory = getMCTSStateMemory(gameDefinition, gameConfig, gameState, memory);
  if (gameStateMemory) {
    const actionStates = actions.map(action =>
      gameDefinition.getStateAfterAction(action, gameState, gameConfig));
    const stateMemories = actionStates.map(actionState =>
      getMCTSStateMemory(gameDefinition, gameConfig, actionState, memory));
    const logParentStateVisits = Math.log(gameStateMemory.visits);
    const ucts = stateMemories.map(stateMemory =>
      stateMemory ? getMCTSStateUCT(stateMemory, logParentStateVisits) : null);
    const maxUCTIndex = indexOfMaxItem(ucts, uct => uct);
    if (maxUCTIndex !== null) {
      // console.log('choosing max UCT action');
      return actions[maxUCTIndex];
    } else {
      const unvisitedIndices = indicesOfItemsWhere(ucts, uct => uct === null);
      // console.log('choosing random unvisited action');
      return actions[randomItem(unvisitedIndices)];
    }
  } else {
    // console.log('choosing random action');
    return randomItem(actions);
  }
}

export const MCTSGameStrategyDefinition: GameStrategyDefinition<
  JsonObject,
  JsonObject,
  JsonObject,
  JsonObject,
  MCTSGameStrategyMemory
> = {
  getNextActionAndMemory: (gameState, gameConfig, gameDefinition, memory) => {
    const nextMemory = think(gameDefinition, gameConfig, gameState, memory);
    const nextAction = choose(gameDefinition, gameConfig, gameState, nextMemory);
    if (nextAction) {
      return {
        nextAction,
        nextMemory,
      };
    } else {
      return null;
    }
  }
};
