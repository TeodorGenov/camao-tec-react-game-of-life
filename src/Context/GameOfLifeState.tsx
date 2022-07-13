import { makeAutoObservable, runInAction } from "mobx";
import Cell from "../Pages/Components/Cell";
import IGameOfLifeLogic from "./IGameOfLifeLogic";

class GameOfLifeState {
	constructor() {
		makeAutoObservable(this);
	}

	private logic: IGameOfLifeLogic | undefined;

	public generation: number = 0;

	public rows: number = 30;

	public cols: number = 50;

	public generationSpeed: number = 100;

	public gameId: any;

	public gridOfCells: any[] = [];

	public fullGrid: Array<any> = Array(this.rows).fill(Array(this.cols).fill(0));

	public setLogic(logic: IGameOfLifeLogic) {
		this.logic = logic;
	}
	public playGame() {
		clearInterval(this.gameId);
		this.gameId = setInterval(() => {
			this.playGeneration();
		}, this.generationSpeed);
	}

	public pauseGame() {
		clearInterval(this.gameId);
	}

	public slowDownGame() {
		this.generationSpeed = 1000;
		this.playGame();
	}

	public fasterGame() {
		this.generationSpeed = 100;
		this.playGame();
	}

	public clearBoard() {
		this.pauseGame();
		this.fullGrid = Array(this.rows).fill(Array(this.cols).fill(0));
		this.generation = 0;
	}

	public playGeneration() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let neighbour = 0;
				if (i > 0) if (this.fullGrid[i - 1][j]) neighbour++;
				if (i > 0 && j > 0) if (this.fullGrid[i - 1][j - 1]) neighbour++;
				if (i > 0 && j < this.cols - 1)
					if (this.fullGrid[i - 1][j + 1]) neighbour++;
				if (j < this.cols - 1) if (this.fullGrid[i][j + 1]) neighbour++;
				if (j > 0) if (this.fullGrid[i][j - 1]) neighbour++;
				if (i < this.rows - 1) if (this.fullGrid[i + 1][j]) neighbour++;
				if (i < this.rows - 1 && j > 0)
					if (this.fullGrid[i + 1][j - 1]) neighbour++;
				if (i < this.rows - 1 && j < this.cols - 1)
					if (this.fullGrid[i + 1][j + 1]) neighbour++;

				if (this.fullGrid[i][j] && (neighbour < 2 || neighbour > 3))
					this.fullGrid[i][j] = 0;
				if (!this.fullGrid[i][j] && neighbour === 3) this.fullGrid[i][j] = 1;
			}
		}
		this.generation++;
	}
	public generateCells() {
		runInAction(() => {
			const tempArray = [];
			for (let i = 0; i < this.rows; i++) {
				for (let k = 0; k < this.cols; k++) {
					let cellID = i + "-" + k;
					let cellStatus = this.fullGrid[i][k];
					let cellStyle = cellStatus === 0 ? "cell dead" : "cell alive";
					tempArray.push(
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
			this.gridOfCells = tempArray;
		});
	}

	public cellSelect(row: number, col: number) {
		runInAction(() => {
			this.fullGrid[row][col] = this.fullGrid[row][col] == 0 ? 1 : 0;
		});
	}

	// move to logic
	public randomFill() {
		this.clearBoard();
		for (let i = 0; i < this.rows; i++) {
			for (let k = 0; k < this.cols; k++) {
				if (Math.floor(Math.random() * 10) === 1) {
					runInAction(() => {
						this.fullGrid[i][k] = 1;
					});
				}
			}
		}
	}

	public initialize() {}
}

export default GameOfLifeState;
