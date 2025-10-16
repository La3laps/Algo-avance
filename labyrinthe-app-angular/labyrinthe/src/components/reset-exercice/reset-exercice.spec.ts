import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetExercice } from './reset-exercice';

describe('ResetExercice', () => {
  let component: ResetExercice;
  let fixture: ComponentFixture<ResetExercice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetExercice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetExercice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
