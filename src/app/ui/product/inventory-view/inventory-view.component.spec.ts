import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryViewComponent } from './inventory-view.component';

describe('InventoryViewComponent', () => {
  let component: InventoryViewComponent;
  let fixture: ComponentFixture<InventoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryViewComponent]
    });
    fixture = TestBed.createComponent(InventoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
