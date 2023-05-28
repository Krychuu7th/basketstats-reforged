import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAddEditFormComponent } from './base-add-edit-form.component';

describe('BaseAddEditFormComponent', () => {
  let component: BaseAddEditFormComponent;
  let fixture: ComponentFixture<BaseAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
