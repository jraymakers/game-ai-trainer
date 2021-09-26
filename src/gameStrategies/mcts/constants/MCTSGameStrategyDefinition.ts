import type { GameStrategyDefinition } from '../../../gameStrategyDefinition/types/GameStrategyDefinition';
import { randomItem } from '../../../generalPurpose/functions/randomItem';
import type { JsonObject } from '../../../generalPurpose/types/Json';
import { incrementMCTSStateVisits } from '../functions/incrementMCTSStateVisits';
import { updateMCTSActionStats } from '../functions/updateMCTSActionStats';
import type { MCTSGameStrategyMemory } from '../types/MCTSGameStrategyMemory';

export const MCTSGameStrategyDefinition: GameStrategyDefinition<
  JsonObject,
  JsonObject,
  JsonObject,
  JsonObject,
  MCTSGameStrategyMemory
> = {
  getNextActionAndMemory: (gameState, gameConfig, gameDefinition, memory) => {
    const actions = gameDefinition.getLegalActions(gameState, gameConfig);
    if (actions.length > 0) {

      // Iterate the following N times:
      // (N should be at least the number of legal actions available from the current state,
      //  to ensure that at least those actions have stats.)

      // Selection:
      // Add the current state to the list of states to update (the "playout")
      // While current state is non-terminal and all legal actions from current state have stats:
      //   Pick an action UCB-randomly and get next state and legal actions.
      //   Add the new current state to the playout.

      // Expansion:
      // If current state is non-terminal:
      //   Pick an action uniformly-randomly from the set witout stats.
      //   Get the next state for this action and add a new record for it (with states set to zero).
      //   Add this new state to the playout.

      // Simulation:
      // While current state is non-terminal:
      //   Pick an action uniformly-randomly and get the next state.
      //   (Note that these states are NOT added to the playout.)

      // Backpropagation:
      // For each state in the playout:
      //   Increment that total number of visits.
      //   Increment the win count for the state if its current player matches the winning player.
      //   (Increment by 1 / (# players) for all states for draws?)

      // Finally, pick the next action to perform using UCB.

      const nextAction = randomItem(actions);

      const stateKey = gameDefinition.getStateKey(gameState, gameConfig);
      const actionKey = gameDefinition.getActionKey(nextAction);

      let nextMemory = incrementMCTSStateVisits(memory, stateKey);
      nextMemory = updateMCTSActionStats(nextMemory, stateKey, actionKey, 0);

      return {
        nextAction,
        nextMemory,
      };
    }
    return null;
  }
};
