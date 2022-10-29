import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerAddEditComponent } from './player-add-edit.component';

describe('PlayerAddEditComponent', () => {
  let component: PlayerAddEditComponent;
  let fixture: ComponentFixture<PlayerAddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
