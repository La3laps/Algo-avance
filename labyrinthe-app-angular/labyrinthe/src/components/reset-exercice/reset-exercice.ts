import { Component, EventEmitter, Output } from '@angular/core';
import { MazeCommunicationService } from '../dropdown-exercice/maze-communication-service';

enum buttonState {
  default = 'restart_default.png',
  hover = 'restart_hover.png',
  clicked = 'restart_clicked.png'
}

@Component({
  selector: 'app-reset-exercice',
  imports: [],
  templateUrl: './reset-exercice.html',
  styleUrl: './reset-exercice.css'
})
export class ResetExercice {
  @Output() resetExerciceSelected = new EventEmitter<void>();
  resetImg: string = buttonState.default;
  constructor(private mazeCommService: MazeCommunicationService) { }

  ngOnInit() { }

  async sendInfo() {
    this.mazeCommService.resetExercice();
    await this.clickLogic();
  }

  async clickLogic() {
    this.resetImg = buttonState.clicked;
    await this.delay(1000);
    this.resetImg = buttonState.default;
  }


  onHover() {
    this.resetImg = buttonState.hover;
  }

  onLeave() {
    this.resetImg = buttonState.default;
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
