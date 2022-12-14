import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeagueAddEditComponent } from './league-add-edit.component';

describe('LeagueAddEditComponent', () => {
  let component: LeagueAddEditComponent;
  let fixture: ComponentFixture<LeagueAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
