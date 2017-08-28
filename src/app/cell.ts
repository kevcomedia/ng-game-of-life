/**
 * Represents a cell in the Game of Life.
 */
export class Cell {
  // The actual state of the cell.
  private currentState = false;
  // This is where the cell's new state will be stored after
  // computing the next generation.
  private tempState = false;
  private _row: number;
  private _col: number;

  // The dead state will be represented by `false`.
  // The live state by `true`.
  constructor(row: number, col: number) {
    this._row = row;
    this._col = col;
  }

  get row(): number {
    return this._row;
  }

  get col(): number {
    return this._col;
  }

  setTempState(state: boolean) {
    this.tempState = state;
  }

  toggleState() {
    this.tempState = !this.tempState;
    this.updateCurrentState();
  }

  updateCurrentState() {
    this.currentState = this.tempState;
  }

  isAlive(): boolean {
    return this.currentState;
  }

  reset() {
    this.currentState = this.tempState = false;
  }
}
