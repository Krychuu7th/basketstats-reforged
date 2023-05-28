import { ValidatorFn } from "@angular/forms";
import { FieldType } from "../enum/field-type";
import { FormViewType } from "../enum/form-view-type";

export interface FormConfig {
    formFields: FormField[];
    headerTextMap?: Map<FormViewType, string>;
}

export interface FormField {
    name: string;
    type: FieldType;
    label?: string;
    placeholder?: string;
    validators?: ValidatorFn[];
    hint?: string;
}