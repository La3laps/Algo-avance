import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Maze } from '../maze/maze';
import { DropdownExercice } from '../components/dropdown-exercice/dropdown-exercice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Maze, DropdownExercice],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('labyrinthe');
}
