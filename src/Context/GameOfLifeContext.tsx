import { createContext, useContext } from "react";
import GameOfLifeLogic from "./GameOfLifeLogic";
import GameOfLifeState from "./GameOfLifeState";

const createGameStore = () => {
	const state = new GameOfLifeState();
	const logic = new GameOfLifeLogic();

	logic.apply(state);
	return state;
};

const GameOfLifeContext = createContext<GameOfLifeState>(createGameStore());

const useGameStore = () => useContext(GameOfLifeContext);

export { GameOfLifeContext, useGameStore, createGameStore };
