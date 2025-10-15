import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { mazeData as _mazeData, mazeData } from '../../data/labyrinthes';
import { MazeCommunicationService } from './maze-communication-service';
import { RandomExercice } from '../random-exercice/random-exercice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown-exercice',
  imports: [RandomExercice],
  templateUrl: './dropdown-exercice.html',
  styleUrl: './dropdown-exercice.css',
})
export class DropdownExercice {
  sizeChoice: string[] = [];
  exerciceChoice: string[][] = [];
  private randomSub!: Subscription;

  @ViewChild('dropdown') dropdownCheckbox!: ElementRef<HTMLInputElement>;
  @ViewChildren('dropdownSub') dropdownSubCheckboxes!: QueryList<ElementRef<HTMLInputElement>>;

  @Output() exerciceSelected = new EventEmitter<{ size: string; exercice: string }>();

  constructor(private mazeCommService: MazeCommunicationService) {}

  ngOnInit() {
    this.randomSub = this.mazeCommService.randomSelected$.subscribe(() => {
      this.uncheckBoxes();
    });

    var index: number = 0;
    this.sizeChoice = Object.keys(mazeData);

    for (let sizeKey in _mazeData) {
      const exercises = _mazeData[sizeKey];
      this.exerciceChoice[index] = [];

      for (let exercise in exercises) {
        this.exerciceChoice[index].push(exercise);
      }
      index++;
    }
  }

  uncheckBoxes() {
    if (this.dropdownCheckbox) {
      this.dropdownCheckbox.nativeElement.checked = false;
    }

    this.dropdownSubCheckboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }

  sendInfo(size: string, exercice: string) {
    this.mazeCommService.selectExercice({ size, exercice });
    this.uncheckBoxes();
  }

  formatExerciseLabel(key: string): string {
    const numberPart = key.split('-')[1];
    return `Ex n°${numberPart}`;
  }
}
