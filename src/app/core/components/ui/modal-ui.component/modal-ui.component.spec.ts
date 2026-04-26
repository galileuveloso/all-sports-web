import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUiComponent } from './modal-ui.component';

describe('ModalUiComponent', () => {
  let component: ModalUiComponent;
  let fixture: ComponentFixture<ModalUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
