import React, { useEffect } from "react";
import IGameOfLifeLogic from "./IGameOfLifeLogic";
import GameOfLifeState from "./GameOfLifeState";
import Cell from "../Pages/Components/Cell";
import { runInAction } from "mobx";

class GameOfLifeLogic implements IGameOfLifeLogic {
	
	private state: GameOfLifeState = new GameOfLifeState();

	public apply(state: GameOfLifeState) {
		this.state = state;
	}
	private logic: IGameOfLifeLogic | null = null;
	public setLogic(logic: IGameOfLifeLogic) {
		this.logic = logic;
	}
}

export default GameOfLifeLogic;
