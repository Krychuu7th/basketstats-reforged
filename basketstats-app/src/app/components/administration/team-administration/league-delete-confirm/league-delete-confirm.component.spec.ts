import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDeleteConfirmComponent } from './league-delete-confirm.component';

describe('LeagueDeleteConfirmComponent', () => {
  let component: LeagueDeleteConfirmComponent;
  let fixture: ComponentFixture<LeagueDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
