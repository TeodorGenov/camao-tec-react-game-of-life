import React from "react";
import { observer } from 'mobx-react-lite';
import "./Cell.scss";
import { useGameStore } from "../../Context/GameOfLifeContext";

const Cell = observer((props: any) => {

	const store = useGameStore();

	return (
		<div className={props.class} id={props.id} onClick={() => store.cellSelect(props.row, props.col)} />
	);
});

export default Cell;
