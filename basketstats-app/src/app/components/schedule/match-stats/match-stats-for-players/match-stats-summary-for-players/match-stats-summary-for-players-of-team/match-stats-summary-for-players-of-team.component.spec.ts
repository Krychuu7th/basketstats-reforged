import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatsSummaryForPlayersOfTeamComponent } from './match-stats-summary-for-players-of-team.component';

describe('MatchStatsSummaryForPlayersOfTeamComponent', () => {
  let component: MatchStatsSummaryForPlayersOfTeamComponent;
  let fixture: ComponentFixture<MatchStatsSummaryForPlayersOfTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchStatsSummaryForPlayersOfTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchStatsSummaryForPlayersOfTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
