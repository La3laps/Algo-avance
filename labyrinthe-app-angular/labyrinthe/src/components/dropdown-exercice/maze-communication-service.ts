import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MazeCommunicationService {
  private exerciceSelectedSource = new Subject<{ size: string; exercice: string }>();
  private randomSelectedSource = new Subject<void>();
  private resetSelectedSource = new Subject<void>();
  private startSelectedSource = new Subject<void>();
  private algorithmSelectedSource = new Subject<string>();

  exerciceSelected$ = this.exerciceSelectedSource.asObservable();
  randomSelected$ = this.randomSelectedSource.asObservable();
  resetSelected$ = this.resetSelectedSource.asObservable();
  startSelected$ = this.startSelectedSource.asObservable();
  algorithmSelected$ = this.algorithmSelectedSource.asObservable();

  selectExercice(data: { size: string; exercice: string }) {
    this.exerciceSelectedSource.next(data);
  }

  selectRandom() {
    this.randomSelectedSource.next();
  }
  resetExercice() {
    this.resetSelectedSource.next();
  }
  startExercice() {
    this.startSelectedSource.next();
  }
  selectAlgorithm(data: string) {
    this.algorithmSelectedSource.next(data);
  }

}
