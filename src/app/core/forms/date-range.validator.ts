import { AbstractControl } from '@angular/forms';
import { stringsToDate } from './form-utils.factory';

export function dateRangeValidator(c: AbstractControl): { [key: string]: any } {
  // Get controls in group
  const startDateC = c.get('startDate');
  const startTimeC = c.get('startTime');
  const endDateC = c.get('endDate');
  const endTimeC = c.get('endTime');
  // Object to return if date is invalid
  const invalidObj = { 'dateRange': true };

  if (startDateC.valid && endDateC.valid) {
    const checkStartTime = startTimeC.invalid ? '12:00 AM' : startTimeC.value;
    const checkEndTime = endTimeC.invalid ? '11:59 PM' : endTimeC.value;
    const startDatetime = stringsToDate(startDateC.value, checkStartTime);
    const endDatetime = stringsToDate(endDateC.value, checkEndTime);

    if (endDatetime >= startDatetime) {
      // Valid range
      return null;
    } else {
      return invalidObj;
    }
  }
  return null;
}
