import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNaoAutorizadoComponent } from './usuario-nao-autorizado-ui.component';

describe('UsuarioNaoAutorizadoComponent', () => {
  let component: UsuarioNaoAutorizadoComponent;
  let fixture: ComponentFixture<UsuarioNaoAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNaoAutorizadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioNaoAutorizadoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
