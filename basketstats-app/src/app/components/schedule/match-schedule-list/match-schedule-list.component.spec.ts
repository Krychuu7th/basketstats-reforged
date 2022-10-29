import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchScheduleListComponent } from './match-schedule-list.component';

describe('MatchScheduleListComponent', () => {
  let component: MatchScheduleListComponent;
  let fixture: ComponentFixture<MatchScheduleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
