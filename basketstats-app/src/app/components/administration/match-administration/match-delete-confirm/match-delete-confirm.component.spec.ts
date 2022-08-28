import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDeleteConfirmComponent } from './match-delete-confirm.component';

describe('MatchDeleteConfirmComponent', () => {
  let component: MatchDeleteConfirmComponent;
  let fixture: ComponentFixture<MatchDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
