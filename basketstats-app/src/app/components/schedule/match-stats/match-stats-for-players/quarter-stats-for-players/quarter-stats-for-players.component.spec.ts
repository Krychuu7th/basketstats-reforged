import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterStatsForPlayersComponent } from './quarter-stats-for-players.component';

describe('QuarterStatsForPlayersComponent', () => {
  let component: QuarterStatsForPlayersComponent;
  let fixture: ComponentFixture<QuarterStatsForPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterStatsForPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterStatsForPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
