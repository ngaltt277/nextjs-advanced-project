export function addYears(date: Date, years: number) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

export function formatDate(date: Date | null) {
  return date?.toLocaleDateString("en-us");
}
