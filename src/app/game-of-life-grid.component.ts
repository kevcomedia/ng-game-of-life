import { Component, Input, OnInit } from '@angular/core';

import { Cell } from './cell';
import { GameOfLifeService } from './game-of-life.service';

@Component({
  selector: 'app-game-of-life-grid',
  templateUrl: './game-of-life-grid.component.html',
  styleUrls: ['./game-of-life-grid.component.css']
})
export class GameOfLifeGridComponent implements OnInit {
  @Input() rows: number;
  @Input() cols: number;
  grid: Cell[][];

  constructor(private gameOfLifeService: GameOfLifeService) {}

  ngOnInit() {
    this.grid = this.gameOfLifeService.getGrid();
  }
}
