import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAdministrationListComponent } from './match-administration-list.component';

describe('MatchAdministrationListComponent', () => {
  let component: MatchAdministrationListComponent;
  let fixture: ComponentFixture<MatchAdministrationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAdministrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAdministrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
