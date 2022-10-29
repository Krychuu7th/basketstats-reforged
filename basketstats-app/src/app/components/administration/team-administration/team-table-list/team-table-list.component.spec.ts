import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamTableListComponent } from './team-table-list.component';

describe('TeamTableListComponent', () => {
  let component: TeamTableListComponent;
  let fixture: ComponentFixture<TeamTableListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
