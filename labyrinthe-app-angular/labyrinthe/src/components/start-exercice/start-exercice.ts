import { Component, EventEmitter, Output } from '@angular/core';
import { MazeCommunicationService } from '../dropdown-exercice/maze-communication-service';

enum buttonState {
  default = 'start_default.png',
  hover = 'start_hover.png',
  clicked = 'start_clicked.png'
}

@Component({
  selector: 'app-start-exercice',
  imports: [],
  templateUrl: './start-exercice.html',
  styleUrl: './start-exercice.css'
})

export class StartExercice {
  @Output() startExerciceSelected = new EventEmitter<void>();
  startImg: string = buttonState.default;
  constructor(private mazeCommService: MazeCommunicationService) { }

  ngOnInit() { }

  async sendInfo() {
    this.mazeCommService.startExercice();
    await this.clickLogic();
  }

  async clickLogic() {
    this.startImg = buttonState.clicked;
    await this.delay(1000);
    this.startImg = buttonState.default;
  }


  onHover() {
    this.startImg = buttonState.hover;
  }

  onLeave() {
    this.startImg = buttonState.default;
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
