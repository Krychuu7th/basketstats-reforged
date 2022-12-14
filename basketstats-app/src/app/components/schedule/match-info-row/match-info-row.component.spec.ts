import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchInfoRowComponent } from './match-info-row.component';

describe('MatchInfoRowComponent', () => {
  let component: MatchInfoRowComponent;
  let fixture: ComponentFixture<MatchInfoRowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchInfoRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInfoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
