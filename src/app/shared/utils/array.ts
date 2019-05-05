export function sortObject(arr: object[], key: string, asc: boolean = false) {
  const order = asc ? 1 : -1;
  arr.sort((locationOne: object, locationTwo: object) => {
    const first = locationOne[key];
    const second = locationTwo[key];
    return first < second ? 1 * order : (first > second ? -1 * order : 0);
  });
  return arr;
}
