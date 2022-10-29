import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamPlayersAvgStatsListComponent } from './team-players-avg-stats-list.component';

describe('TeamPlayersAvgStatsListComponent', () => {
  let component: TeamPlayersAvgStatsListComponent;
  let fixture: ComponentFixture<TeamPlayersAvgStatsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamPlayersAvgStatsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPlayersAvgStatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
