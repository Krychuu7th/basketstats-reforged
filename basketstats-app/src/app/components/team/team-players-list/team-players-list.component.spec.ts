import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamPlayersListComponent } from './team-players-list.component';

describe('TeamPlayersListComponent', () => {
  let component: TeamPlayersListComponent;
  let fixture: ComponentFixture<TeamPlayersListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
