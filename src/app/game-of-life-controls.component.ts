import { Component, OnInit } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-game-of-life-controls',
  templateUrl: './game-of-life-controls.component.html',
  styleUrls: ['./game-of-life-controls.component.css']
})
export class GameOfLifeControlsComponent implements OnInit {
  private intervalId: number;
  private isRunning: boolean;

  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit() {
    this.start();
  }

  start() {
    this.intervalId = window.setInterval(() => {
      this.gameOfLifeService.nextGeneration();
    }, 100);
    this.isRunning = true;
  }

  stop() {
    window.clearInterval(this.intervalId);
    this.isRunning = false;
  }

  getGenerationCount() {
    return this.gameOfLifeService.getGenerationCount();
  }

  reset() {
    this.stop();
    this.gameOfLifeService.reset();
  }
}
