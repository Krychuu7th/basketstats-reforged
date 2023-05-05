import { BaseCrudResource } from "../shared/model/base-crud-resource.model";

export class League extends BaseCrudResource<League> {
  name: string;
}
