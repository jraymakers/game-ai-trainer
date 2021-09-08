import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameCatalog/types/GameRegistration';
import { GameSelector } from '../../gameSelection/components/GameSelector';
import type { JsonObject } from '../../generalPurpose/types/Json';

export const Root: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameRegistration | null>(null);
  const handleSelectGame = useCallback((gameRegistration: GameRegistration) => {
    setSelectedGame(gameRegistration);
  }, []);
  const handleClearSelectedGame = useCallback(() => {
    setSelectedGame(null);
  }, []);

  const [gameConfig, setGameConfig] = useState<JsonObject | null>(null);
  const [gameState, setGameState] = useState<JsonObject | null>(null);
  const handleSubmitGameConfig = useCallback((newGameConfig: JsonObject) => {
    if (selectedGame) {
      setGameConfig(newGameConfig);
      setGameState(selectedGame.definition.createInitialState(newGameConfig));
    }
  }, [selectedGame]);

  const handleGameAction = useCallback((gameAction: JsonObject) => {
    console.log(gameAction);
  }, []);

  const handleLeaveGame = useCallback(() => {
    console.log('leave game');
  }, []);

  const handleEndGame = useCallback(() => {
    console.log('end game');
  }, []);

  // const handleTakeTurn = useCallback(() => {
  //   if (selectedGame && gameConfig && gameState) {
  //     const action = {
  //       rowIndex: 0,
  //       itemsToRemove: 1,
  //     };
  //     setGameState(selectedGame.definition.getStateAfterAction(gameConfig, gameState, action));
  //   }
  // }, [selectedGame, gameConfig, gameState]);

  return (
    <div>
      <div>Game AI Trainer</div>
      <div>
        {selectedGame ? (
          <div>
            {gameConfig && gameState ? (
              selectedGame.ui ? (
                <selectedGame.ui
                  config={gameConfig}
                  state={gameState}
                  onAction={handleGameAction}
                  onLeave={handleLeaveGame}
                  onEnd={handleEndGame}
                />
              ) : (
              <div>
                <div>Active Game: {selectedGame.displayName}</div>
                <div>
                  <pre>{JSON.stringify(gameConfig, null, 2)}</pre>
                </div>
                <div>
                  <pre>{JSON.stringify(gameState, null, 2)}</pre>
                </div>
                {/* <div>
                  <button onClick={handleTakeTurn}>Take Turn</button>
                </div> */}
              </div>
              )
            ) : (
              selectedGame.configEditor ? (
                <div>
                  <div>Configure Game: {selectedGame.displayName}</div>
                  <selectedGame.configEditor
                    onSubmit={handleSubmitGameConfig}
                    onCancel={handleClearSelectedGame}
                  />
                </div>
              ) : (
                <div>No config editor</div>
              )
            )}
          </div>
        ) : (
          <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
        )}
      </div>
    </div>
  );
};
