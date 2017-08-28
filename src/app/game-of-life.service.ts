import { Injectable } from '@angular/core';
import { Cell } from './cell';

@Injectable()
export class GameOfLifeService {
  private cells: Cell[];
  private rows: number;
  private cols: number;
  private generationCount = 0;

  initialize(rows = 10, cols = 10) {
    const minDimension = 5;
    if (rows < minDimension || cols < minDimension) {
      throw Error(`Width and height must be at least ${minDimension}.`);
    }

    this.rows = rows;
    this.cols = cols;
    this.generationCount = 0;
    this.cells = Array.from({
      length: rows * cols
    }).map((_, i, a) => new Cell(Math.floor(i / this.cols), i % this.cols));
  }

  randomizeCellStates(cellLifeChance = 0.2) {
    if (!this.cells) {
      throw Error('Grid has not yet been initialized.');
    }

    this.reset();
    this.cells.forEach(cell => {
      if (Math.random() < cellLifeChance) {
        cell.toggleState();
      }
    });
    // no need to update the previous states because we're starting from scratch anyway
  }

  getGrid(): Cell[][] {
    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid.push(this.cells.slice(i * this.cols, (i + 1) * this.cols));
    }
    return grid;
  }

  getCellAt(row = 0, col = 0): Cell {
    return this.cells[row * this.cols + col];
  }

  toggleCellStateAt(row = 0, col = 0) {
    if (this.isOutOfBounds({row, col})) {
      throw Error('Cell coordinates are out of bounds.');
    }

    this.getCellAt(row, col).toggleState();
  }

  updateGridState() {
    this.cells.forEach(cell => cell.updateCurrentState());
  }

  reset() {
    this.cells.forEach(cell => cell.reset());
    this.generationCount = 0;
  }

  nextGeneration() {
    const alive = true;
    this.cells.forEach(cell => {
      const liveNeighborCount = this.getNeighborsOfCellAt(cell.row, cell.col)
        .filter(c => c.isAlive())
        .length;

      switch (liveNeighborCount) {
        case 2: // cell retains status; do nothing
          break;
        case 3: // dead cell comes to life; live cells remain alive anyway
          cell.setTempState(alive);
          break;
        default:  // live cell dies; dead cells remain dead
          cell.setTempState(!alive);
      }
    });
    this.generationCount++;
    this.updateGridState();
  }

  getGenerationCount() {
    return this.generationCount;
  }

  private getNeighborsOfCellAt(row = 0, col = 0): Cell[] {
    if (this.isOutOfBounds({row, col})) {
      throw Error('Cell coordinates are out of bounds.');
    }

    const possibleNeighborIndexes = [
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1}
    ].filter(offset => !this.isOutOfBounds(offset));

    return possibleNeighborIndexes.map(({row: r, col: c}) => this.getCellAt(r, c));
  }

  private isOutOfBounds({row, col}) {
    return this.isRowOutOfBounds(row) || this.isColOutOfBounds(col);
  }

  private isRowOutOfBounds(row) {
    return row < 0 || this.rows <= row;
  }

  private isColOutOfBounds(col) {
    return col < 0 || this.cols <= col;
  }
}
