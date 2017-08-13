import { Injectable } from '@angular/core';
import { CellState } from './cell-state';

@Injectable()
export class GameOfLifeService {
  private grid: CellState[][];
  private rows: number;
  private cols: number;
  generationCount = 0;

  initialize(rows = 10, cols = 10) {
    const minDimension = 5;
    if (rows < minDimension || cols < minDimension) {
      throw Error(`Width and height must be at least ${minDimension}.`);
    }

    this.rows = rows;
    this.cols = cols;
    this.generationCount = 0;
    this.grid = Array(rows).fill(Array(cols).fill(new CellState()));
  }

  initializeRandom(rows = 10, cols = 10, cellLifeChance = 0.1) {
    if (cellLifeChance < 0 || 1 <= cellLifeChance) {
      throw Error('Invalid probability for random cell life chance.');
    }
    this.initialize(rows, cols);
    this.grid.forEach(row => {
      row.forEach(cell => {
        if (Math.random() < cellLifeChance) {
          cell.toggleState();
        }
      });
    });
  }

  toggleCellStateAt(row = 0, col = 0) {
    if (this.isOutOfBounds({row, col})) {
      throw Error('Cell coordinates are out of bounds.');
    }

    this.grid[row][col].toggleState();
  }

  updateGridState() {
    this.grid.forEach(row => {
      row.forEach(cell => cell.updateState());
    });
  }

  stepToNextGeneration() {
    this.grid.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        const liveNeighborCount = this.getNeighborsOfCellAt(ri, ci).filter(c => c.isAlive()).length;
        if (cell.isAlive()) {
          if (liveNeighborCount < 2 || liveNeighborCount > 3) {
            cell.toggleState();
          }
        } else {
          if (liveNeighborCount === 3) {
            cell.toggleState();
          }
        }
      });
    });

    this.updateGridState();
    this.generationCount++;
  }

  reset() {
    this.initialize(this.rows, this.cols);
  }

  private getNeighborsOfCellAt(row = 0, col = 0) {
    if (this.isOutOfBounds({row, col})) {
      throw Error('Cell coordinates are out of bounds.');
    }

    const possibleNeightborIndexes = [
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col - 1 },
      { row: row, col: col - 1 },
      { row: row - 1, col: col - 1}
    ].filter(offset => !this.isOutOfBounds(offset));

    return possibleNeightborIndexes.map(({row: r, col: c}) => this.grid[r][c]);
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
