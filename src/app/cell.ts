export class Cell {
  previousState = false;
  currentState = false;
  row: number;
  col: number;
  // The dead state will be represented by `false`.
  // The live state by `true`.
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  setCurrentState(state: boolean) {
    this.currentState = state;
  }

  toggleState() {
    this.currentState = !this.currentState;
  }

  updateState() {
    this.previousState = this.currentState;
  }

  isAlive(): boolean {
    return this.currentState;
  }

  reset() {
    this.previousState = this.currentState = false;
  }
}
