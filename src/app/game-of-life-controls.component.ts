import { Component, OnInit } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-game-of-life-controls',
  templateUrl: './game-of-life-controls.component.html',
  styleUrls: ['./game-of-life-controls.component.css']
})
export class GameOfLifeControlsComponent implements OnInit {
  private intervalId: number;
  private _isRunning: boolean;

  constructor(private gameOfLifeService: GameOfLifeService) {}

  get isRunning() {
    return this._isRunning;
  }

  ngOnInit() {
    this.start();
  }

  start() {
    this.intervalId = window.setInterval(() => {
      this.gameOfLifeService.nextGeneration();
    }, 100);
    this._isRunning = true;
  }

  stop() {
    window.clearInterval(this.intervalId);
    this._isRunning = false;
  }

  getGenerationCount() {
    return this.gameOfLifeService.generationCount;
  }

  reset() {
    this.stop();
    this.gameOfLifeService.reset();
  }
}
