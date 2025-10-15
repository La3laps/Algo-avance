import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-tunic-fox',
  imports: [NgStyle],
  templateUrl: './tunic-fox.html',
  styleUrl: './tunic-fox.css',
})
export class TunicFox {
  @Input() posForFox!: { posX: number; posY: number };
  @Input() mazeSize!: number;
  @Input() foxImg: string = 'tunic_fox_sleep.gif';
  @Input() foxFlipped: boolean = false;
  ngOnInit() { }

  get setFoxPos(): object {
    // console.log('Fox position: ' + this.posForFox.posX + ' : ' + this.posForFox.posY);
    return { top: `${this.posForFox.posX}px`, left: `${this.posForFox.posY}px` };
  }

  get setFoxSize(): object {
    const cellPixelSize: number = Math.floor(600 / this.mazeSize);
    return { width: `${cellPixelSize}px`, 'aspect-ratio': '1 / 1' };
  }

  get isFoxFlipped(): object {
    if (!this.foxFlipped) {
      return { transform: 'scaleX(-1)' };
    }
    return {};
  }

  get foxStyle(): object {
    return {
      ...this.setFoxPos,
      ...this.setFoxSize,
      ...this.isFoxFlipped
    };
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
