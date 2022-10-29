import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamAdministrationComponent } from './team-administration.component';

describe('TeamAdministrationComponent', () => {
  let component: TeamAdministrationComponent;
  let fixture: ComponentFixture<TeamAdministrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
