import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDetalhe } from './componente-detalhe';

describe('ComponenteDetalhe', () => {
  let component: ComponenteDetalhe;
  let fixture: ComponentFixture<ComponenteDetalhe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDetalhe],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteDetalhe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
