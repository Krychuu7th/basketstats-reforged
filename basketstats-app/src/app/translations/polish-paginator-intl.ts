import {MatPaginatorIntl} from "@angular/material/paginator";

let polishRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 z ${length}`; }

  length = Math.max(length, 0);

  let lowIndex = page * pageSize;

  let highIndex = lowIndex < length ?
    Math.min(lowIndex + pageSize, length) :
    lowIndex + pageSize;

  return `${lowIndex + 1} - ${highIndex} z ${length}`;
}

export function getPolishPaginatorIntl() {
  let paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elementów na stronie:';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia srona';
  paginatorIntl.getRangeLabel = polishRangeLabel;

  return paginatorIntl;
}
