import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameOfLifeGridComponent } from './game-of-life-grid.component';
import { GameOfLifeService } from './game-of-life.service';

@NgModule({
  declarations: [
    AppComponent,
    GameOfLifeGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameOfLifeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
