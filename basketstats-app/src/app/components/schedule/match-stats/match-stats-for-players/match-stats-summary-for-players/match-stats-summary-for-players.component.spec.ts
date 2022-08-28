import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatsSummaryForPlayersComponent } from './match-stats-summary-for-players.component';

describe('MatchStatsSummaryForPlayersComponent', () => {
  let component: MatchStatsSummaryForPlayersComponent;
  let fixture: ComponentFixture<MatchStatsSummaryForPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchStatsSummaryForPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchStatsSummaryForPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
