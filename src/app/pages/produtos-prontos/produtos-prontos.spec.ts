import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosProntos } from './produtos-prontos';

describe('ProdutosProntos', () => {
  let component: ProdutosProntos;
  let fixture: ComponentFixture<ProdutosProntos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosProntos],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosProntos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
