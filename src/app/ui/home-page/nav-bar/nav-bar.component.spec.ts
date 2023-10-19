import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let adminToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzMwMzE4LCJleHAiOjE2OTc3NzM1MTh9.oBp3HiUpMyRH_ljsR3xu-9fQhcL7vONftRxdTOj0s1o';

    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(localStorage, 'getItem').and.returnValue(adminToken);
    expect(component).toBeTruthy();
  });
});
