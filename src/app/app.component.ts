import { Component, OnInit } from '@angular/core';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rows = 50;
  cols = 50;

  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit() {
    this.gameOfLifeService.initialize(this.rows, this.cols);
    this.gameOfLifeService.randomizeCellStates();
  }

  step() {
    this.gameOfLifeService.nextGeneration();
  }

  reset() {
    this.gameOfLifeService.reset();
  }
}
