import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchDeleteConfirmComponent } from './match-delete-confirm.component';

describe('MatchDeleteConfirmComponent', () => {
  let component: MatchDeleteConfirmComponent;
  let fixture: ComponentFixture<MatchDeleteConfirmComponent>;

  beforeEach(waitForAsync(() => {
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
