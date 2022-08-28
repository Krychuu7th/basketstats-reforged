import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchesComponent } from './user-matches.component';

describe('UserMatchesComponent', () => {
  let component: UserMatchesComponent;
  let fixture: ComponentFixture<UserMatchesComponent>;

  beforeEach(async(() => {
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
