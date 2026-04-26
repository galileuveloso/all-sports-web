import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoInserirModalComponent } from './estabelecimento-inserir-modal.component';

describe('EstabelecimentoInserirModalComponent', () => {
  let component: EstabelecimentoInserirModalComponent;
  let fixture: ComponentFixture<EstabelecimentoInserirModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstabelecimentoInserirModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstabelecimentoInserirModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
