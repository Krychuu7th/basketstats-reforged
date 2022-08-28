import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDeleteConfirmComponent } from './player-delete-confirm.component';

describe('PlayerDeleteConfirmComponent', () => {
  let component: PlayerDeleteConfirmComponent;
  let fixture: ComponentFixture<PlayerDeleteConfirmComponent>;

  beforeEach(async(() => {
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
