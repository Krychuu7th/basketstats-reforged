import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamCardListComponent } from './team-card-list.component';

describe('TeamCardListComponent', () => {
  let component: TeamCardListComponent;
  let fixture: ComponentFixture<TeamCardListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
