import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayerDeleteConfirmComponent } from './player-delete-confirm.component';

describe('PlayerDeleteConfirmComponent', () => {
  let component: PlayerDeleteConfirmComponent;
  let fixture: ComponentFixture<PlayerDeleteConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
