import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MazeCommunicationService {
  private exerciceSelectedSource = new Subject<{ size: string; exercice: string }>();
  private randomSelectedSource = new Subject<void>();

  exerciceSelected$ = this.exerciceSelectedSource.asObservable();
  randomSelected$ = this.randomSelectedSource.asObservable();

  selectExercice(data: { size: string; exercice: string }) {
    this.exerciceSelectedSource.next(data);
  }

  selectRandom() {
    this.randomSelectedSource.next();
  }
}
