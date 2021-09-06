import type { NamedEntity } from '../../generalPurpose/types/Entity';

export type Player = NamedEntity & Readonly<{
}>;

export type Players = readonly Player[];

export type MultiplayerGameConfig = Readonly<{
  players: Players;
}>;

export type CurrentPlayerGameState = Readonly<{
  currentPlayerIndex: number;
}>;
