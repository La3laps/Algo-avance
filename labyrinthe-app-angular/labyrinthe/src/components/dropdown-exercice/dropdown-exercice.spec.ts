import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownExercice } from './dropdown-exercice';

describe('DropdownExercice', () => {
  let component: DropdownExercice;
  let fixture: ComponentFixture<DropdownExercice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownExercice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownExercice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
