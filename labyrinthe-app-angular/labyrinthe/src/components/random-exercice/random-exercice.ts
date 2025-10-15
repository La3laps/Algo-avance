import { Component, EventEmitter, Output } from '@angular/core';

import { mazeData as _mazeData, mazeData } from '../../data/labyrinthes';
import { MazeCommunicationService } from '../dropdown-exercice/maze-communication-service';

@Component({
  selector: 'app-random-exercice',
  imports: [],
  templateUrl: './random-exercice.html',
  styleUrl: './random-exercice.css',
})
export class RandomExercice {
  @Output() randomExerciceSelected = new EventEmitter<void>();

  constructor(private mazeCommService: MazeCommunicationService) {}

  ngOnInit() {}

  sendInfo() {
    this.mazeCommService.selectRandom();
  }
}
