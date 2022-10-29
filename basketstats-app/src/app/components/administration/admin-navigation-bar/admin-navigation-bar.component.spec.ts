import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminNavigationBarComponent } from './admin-navigation-bar.component';

describe('AdminNavigationBarComponent', () => {
  let component: AdminNavigationBarComponent;
  let fixture: ComponentFixture<AdminNavigationBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
