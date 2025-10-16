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
import { MazeCommunicationService } from '../dropdown-exercice/maze-communication-service';
import { algorithms } from '../../maze/maze-algorithms/maze-algorithms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-algorithm-choice',
  imports: [],
  templateUrl: './algorithm-choice.html',
  styleUrl: './algorithm-choice.css',
})
export class AlgorithmChoice {
  algorithmList!: string[];


  @ViewChild('algorithmDropdown') dropdownCheckbox!: ElementRef<HTMLInputElement>;

  @Output() algorithmSelected = new EventEmitter<string>();

  constructor(private mazeCommService: MazeCommunicationService) { }

  ngOnInit() {
    this.listAlgorithms();
  }


  listAlgorithms() {
    this.algorithmList = Object.keys(algorithms);
  }

  sendAlgoName(algorithmName: string) {
    this.mazeCommService.selectAlgorithm(algorithmName);
  }

  selectAlgorithm(algo: string) {
    this.dropdownCheckbox.nativeElement.checked = false;
    this.sendAlgoName(algo);
  }

  getPrintedNameFromString(algo: string): string {
    switch (algo) {
      case 'random':
        return "Aléatoire";
      case 'dfs':
        return "Depth First Search (DFS)";
      case 'bfs':
        return "Breadth First Search (BFS)"
    }
    return '';
  }
}
