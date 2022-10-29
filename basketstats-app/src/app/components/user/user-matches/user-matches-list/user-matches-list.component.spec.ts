import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMatchesListComponent } from './user-matches-list.component';

describe('UserMatchesListComponent', () => {
  let component: UserMatchesListComponent;
  let fixture: ComponentFixture<UserMatchesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
