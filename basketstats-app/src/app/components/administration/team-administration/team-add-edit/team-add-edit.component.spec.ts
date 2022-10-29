import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamAddEditComponent } from './team-add-edit.component';

describe('TeamAddEditComponent', () => {
  let component: TeamAddEditComponent;
  let fixture: ComponentFixture<TeamAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
