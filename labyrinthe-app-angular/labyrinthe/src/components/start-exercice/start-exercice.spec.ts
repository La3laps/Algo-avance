import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartExercice } from './start-exercice';

describe('StartExercice', () => {
  let component: StartExercice;
  let fixture: ComponentFixture<StartExercice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartExercice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartExercice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
