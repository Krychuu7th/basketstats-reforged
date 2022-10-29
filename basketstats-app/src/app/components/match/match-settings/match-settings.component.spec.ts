import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchSettingsComponent } from './match-settings.component';

describe('MatchSettingsComponent', () => {
  let component: MatchSettingsComponent;
  let fixture: ComponentFixture<MatchSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
