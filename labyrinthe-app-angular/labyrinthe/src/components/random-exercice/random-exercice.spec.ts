import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomExercice } from './random-exercice';

describe('DropdownExercice', () => {
  let component: RandomExercice;
  let fixture: ComponentFixture<RandomExercice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomExercice],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomExercice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
