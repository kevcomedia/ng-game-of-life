import { Component } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-game-of-life-controls',
  templateUrl: './game-of-life-controls.component.html'
})
export class GameOfLifeControlsComponent {
  constructor(private gameOfLifeService: GameOfLifeService) {}

  getGenerationCount() {
    return this.gameOfLifeService.getGenerationCount();
  }

  step() {
    this.gameOfLifeService.nextGeneration();
  }

  reset() {
    this.gameOfLifeService.reset();
  }
}
