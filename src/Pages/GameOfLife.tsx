import React, { useEffect } from "react";

import "./GameOfLife.scss";
import Board from "./Components/Board";
import { useGameStore } from "../Context/GameOfLifeContext";
import { observer } from "mobx-react-lite";

const GameOfLife = observer(() => {
	const store = useGameStore();
	useEffect(() => {
		store.generateCells();
		store.randomFill();
		// store.playGame();
	}, []);
	return (
		<div>
			<h1 className="center-position">The Game Of Life</h1>
			<Board />
			<div className="center-position">
			<button className="btn" role="button" onClick={() => store.playGame()}>Play</button>
			<button className="btn" role="button" onClick={() => store.pauseGame()}>Pause</button>
			<button className="btn" role="button" onClick={() => store.clearBoard()}>Clear Board</button>
			<button className="btn" role="button" onClick={() => store.randomFill()}>Fill Randomly</button>
			<button className="btn" role="button" onClick={() => store.fasterGame()}>Faster</button>
			<button className="btn" role="button" onClick={() => store.slowDownGame()}>Slower</button>
			</div>
			<div className="center-position">{store.generation}</div>
		</div>
	);
});

export default GameOfLife;
