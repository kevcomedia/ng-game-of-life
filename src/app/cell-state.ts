export class CellState {
  // The dead state will be represented by `false`.
  // The live state by `true`.
  constructor(public previous = false, public current = false) {}

  toggleState() {
    this.current = !this.current;
  }

  updateState() {
    this.previous = this.current;
  }

  isAlive() {
    return this.current;
  }
}
