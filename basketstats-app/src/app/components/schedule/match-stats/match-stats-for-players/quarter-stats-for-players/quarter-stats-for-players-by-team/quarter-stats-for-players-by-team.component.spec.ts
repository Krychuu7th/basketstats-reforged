import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterStatsForPlayersByTeamComponent } from './quarter-stats-for-players-by-team.component';

describe('QuarterStatsForPlayersByTeamComponent', () => {
  let component: QuarterStatsForPlayersByTeamComponent;
  let fixture: ComponentFixture<QuarterStatsForPlayersByTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterStatsForPlayersByTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterStatsForPlayersByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
