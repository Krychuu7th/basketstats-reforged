import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserMatchesComponent } from './user-matches.component';

describe('UserMatchesComponent', () => {
  let component: UserMatchesComponent;
  let fixture: ComponentFixture<UserMatchesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
