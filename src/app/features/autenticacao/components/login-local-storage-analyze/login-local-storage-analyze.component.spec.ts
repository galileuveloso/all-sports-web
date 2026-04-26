import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLocalStorageAnalyzeComponent } from './login-local-storage-analyze.component';

describe('LoginLocalStorageAnalyzeComponent', () => {
  let component: LoginLocalStorageAnalyzeComponent;
  let fixture: ComponentFixture<LoginLocalStorageAnalyzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLocalStorageAnalyzeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLocalStorageAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
