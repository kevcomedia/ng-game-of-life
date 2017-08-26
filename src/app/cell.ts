export class Cell {
  currentState = false;
  tempState = false;
  row: number;
  col: number;
  // The dead state will be represented by `false`.
  // The live state by `true`.
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
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
