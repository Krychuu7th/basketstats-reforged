import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUserConfirmComponent } from './link-user-confirm.component';

describe('LinkUserConfirmComponent', () => {
  let component: LinkUserConfirmComponent;
  let fixture: ComponentFixture<LinkUserConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkUserConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUserConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
