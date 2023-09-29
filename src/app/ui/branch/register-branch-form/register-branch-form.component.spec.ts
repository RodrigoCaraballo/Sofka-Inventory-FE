import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBranchFormComponent } from './register-branch-form.component';

describe('RegisterBranchFormComponent', () => {
  let component: RegisterBranchFormComponent;
  let fixture: ComponentFixture<RegisterBranchFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBranchFormComponent]
    });
    fixture = TestBed.createComponent(RegisterBranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
