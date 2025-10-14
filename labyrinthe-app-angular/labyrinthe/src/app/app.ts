import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Maze } from "../maze/maze";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Maze],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('labyrinthe');
}
