import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchStatsForPlayersComponent } from './match-stats-for-players.component';

describe('MatchStatsForPlayersComponent', () => {
  let component: MatchStatsForPlayersComponent;
  let fixture: ComponentFixture<MatchStatsForPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchStatsForPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchStatsForPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
