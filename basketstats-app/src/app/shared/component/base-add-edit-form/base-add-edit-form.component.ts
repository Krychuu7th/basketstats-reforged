import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldType } from '../../enum/field-type';
import { FormViewType } from '../../enum/form-view-type';
import { BaseCrudResource } from '../../model/base-crud-resource.model';
import { FormConfig } from '../../model/form-config';

@Component({
  selector: 'app-base-add-edit-form',
  templateUrl: './base-add-edit-form.component.html',
  styleUrls: ['./base-add-edit-form.component.scss']
})
export class BaseAddEditFormComponent<T extends BaseCrudResource> implements OnInit {

  @Input()
  dataObject: T;
  @Input()
  formViewType: FormViewType;
  @Input()
  formConfig: FormConfig;

  public formGroup: FormGroup;
  public fieldType = FieldType;
  public validators = Validators;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.formGroup = this.getInitForm();
  }

  private getInitForm(): FormGroup {
    const { formFields, defaultValue } = this.formConfig || {};
    const group: any = {};
    formFields.forEach(formFieldDef => {
      group[formFieldDef.name] = new UntypedFormControl(
        (this.dataObject as any)?.[formFieldDef.name] ?? defaultValue?.[formFieldDef.name],
        !!formFieldDef.validators ? [...formFieldDef.validators!] : []
      );
    });
    return new FormGroup(group);
  }

  public submit(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.activeModal.close(
      {
        ...this.dataObject,
        ...this.formGroup.getRawValue()
      }
    );
  }

  public compareWithId(object1: BaseCrudResource, object2: BaseCrudResource): boolean {
    return !!object1?.id && !!object2?.id && object1.id === object2.id;
  }

  public get headerText(): string | undefined {
    return this.formConfig.headerTextMap?.get(this.formViewType);
  }

  public get readonly(): boolean {
    return this.formViewType === FormViewType.PREVIEW;
  }

}
