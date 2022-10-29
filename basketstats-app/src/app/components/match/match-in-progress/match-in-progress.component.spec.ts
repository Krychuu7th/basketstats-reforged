import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchInProgressComponent } from './match-in-progress.component';

describe('MatchInProgressComponent', () => {
  let component: MatchInProgressComponent;
  let fixture: ComponentFixture<MatchInProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
