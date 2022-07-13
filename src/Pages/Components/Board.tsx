import React from "react";
import { observer } from "mobx-react-lite";
import { useGameStore } from "../../Context/GameOfLifeContext";
import "./Board.scss";
import Cell from "./Cell";
import { runInAction } from "mobx";

const Board = observer(() => {
	const store = useGameStore();
	const rowsArray = [];
	for (let i = 0; i < store.rows; i++) {
		for (let k = 0; k < store.cols; k++) {
			let cellID = i + "-" + k;
			let cellStatus = store.fullGrid[i][k];
			let cellStyle = cellStatus === 0 ? "cell dead" : "cell alive";
			rowsArray.push(
				<Cell
					class={cellStyle}
					status={cellStatus}
					key={cellID}
					id={cellID}
					row={i}
					col={k}
				/>
			);
		}
	}
	return (
		<div className="board" style={{ width: store.cols * 16 }}>
			{rowsArray}
		</div>
	);
});

export default Board;
