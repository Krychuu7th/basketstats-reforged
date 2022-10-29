import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchAdministrationComponent } from './match-administration.component';

describe('MatchAdministrationComponent', () => {
  let component: MatchAdministrationComponent;
  let fixture: ComponentFixture<MatchAdministrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
