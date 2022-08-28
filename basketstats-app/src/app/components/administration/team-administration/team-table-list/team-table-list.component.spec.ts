import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTableListComponent } from './team-table-list.component';

describe('TeamTableListComponent', () => {
  let component: TeamTableListComponent;
  let fixture: ComponentFixture<TeamTableListComponent>;

  beforeEach(async(() => {
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
