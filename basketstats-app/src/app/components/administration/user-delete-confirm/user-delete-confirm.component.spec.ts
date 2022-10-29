import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDeleteConfirmComponent } from './user-delete-confirm.component';

describe('UserDeleteConfirmComponent', () => {
  let component: UserDeleteConfirmComponent;
  let fixture: ComponentFixture<UserDeleteConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
