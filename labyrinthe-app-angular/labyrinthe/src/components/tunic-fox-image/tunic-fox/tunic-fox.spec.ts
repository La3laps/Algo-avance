import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TunicFox } from './tunic-fox';

describe('TunicFox', () => {
  let component: TunicFox;
  let fixture: ComponentFixture<TunicFox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TunicFox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TunicFox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
