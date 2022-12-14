import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchEditComponent } from './match-edit.component';

describe('MatchEditComponent', () => {
  let component: MatchEditComponent;
  let fixture: ComponentFixture<MatchEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
