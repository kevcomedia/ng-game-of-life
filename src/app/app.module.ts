import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameOfLifeGridComponent } from './game-of-life-grid.component';
import { GameOfLifeControlsComponent } from './game-of-life-controls.component';
import { GameOfLifeService } from './game-of-life.service';

@NgModule({
  declarations: [
    AppComponent,
    GameOfLifeGridComponent,
    GameOfLifeControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameOfLifeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
