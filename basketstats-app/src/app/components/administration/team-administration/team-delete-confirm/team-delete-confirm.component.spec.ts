import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamDeleteConfirmComponent } from './team-delete-confirm.component';

describe('TeamDeleteConfirmComponent', () => {
  let component: TeamDeleteConfirmComponent;
  let fixture: ComponentFixture<TeamDeleteConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
