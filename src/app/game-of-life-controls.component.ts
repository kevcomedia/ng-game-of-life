import { Component } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-game-of-life-controls',
  templateUrl: './game-of-life-controls.component.html'
})
export class GameOfLifeControlsComponent {
  private intervalId: number;

  constructor(private gameOfLifeService: GameOfLifeService) {}

  start() {
    this.intervalId = window.setInterval(() => {
      this.gameOfLifeService.nextGeneration();
    }, 100);
  }

  stop() {
    window.clearInterval(this.intervalId);
  }

  getGenerationCount() {
    return this.gameOfLifeService.getGenerationCount();
  }

  reset() {
    this.stop();
    this.gameOfLifeService.reset();
  }
}
