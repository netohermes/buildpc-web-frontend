import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Montador } from './montador';

describe('Montador', () => {
  let component: Montador;
  let fixture: ComponentFixture<Montador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Montador],
    }).compileComponents();

    fixture = TestBed.createComponent(Montador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
