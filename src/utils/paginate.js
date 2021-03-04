import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  //We need a lodash object in order to chain the two methods (slice and take) - Code more fluent
  return _(items).slice(startIndex).take(pageSize).value();
}
