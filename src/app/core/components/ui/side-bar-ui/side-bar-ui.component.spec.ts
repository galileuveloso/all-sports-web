import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarUiComponent } from './side-bar-ui.component';

describe('SideBarUiComponent', () => {
  let component: SideBarUiComponent;
  let fixture: ComponentFixture<SideBarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarUiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
