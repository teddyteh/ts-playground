// The businessmen among you will know that it's often not easy to find an appointment. In this
// task we want to find such an appointment automatically. You will be given the calendars of
// our businessmen and a duration for the meeting. Your task is to find the earliest time, when
// every businessman is free for at least that duration.
// 
// Requirements:
// - All times in the calendars will be given in 24h format "hh:mm", the result must also be in
// that format
// - A meeting is represented by its start time (inclusively) and end time (exclusively) -> if a
// meeting takes place from 09:00 - 11:00, the next possible start time would be 11:00
// - The businessmen work from 09:00 (inclusively) - 19:00 (exclusively), the appointment
// must start and end within that range
// - If the meeting does not fit into the schedules, return null
// - The duration of the meeting will be provided as an integer in minutes
// 
// Following these rules and looking at the example below the earliest time for a 60 minutes
// meeting would be 12:15.

export type TimeSlot = [string, string];

const OFF_TIME_IN_DATE = new Date(1970, 0, 1, 19, 0);

const parseTimeString = (time: string) => {
  const [hours, minutes] = time.split(":");
  return new Date(1970, 0, 1, Number(hours), Number(minutes));
};

const getDifferenceInMinutes = (date1: Date, date2: Date) => {
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  const differenceInMinutes = Math.abs(
    Math.floor(differenceInMilliseconds / (1000 * 60))
  );

  return differenceInMinutes;
};

const findEarliestGap = (timeSlots: TimeSlot[], durationMinutes: number) => {
  for (const [index, timeSlot] of timeSlots.entries()) {
    if (!timeSlots[index + 1]) {
      break;
    }

    const [nextStartTime, nextEndTime] = timeSlots[index + 1];
    const nextEndTimeInDate = parseTimeString(nextEndTime);

    // Check if the time slot is entirely outside the working hours (09:00 to 19:00)
    if (nextEndTimeInDate >= OFF_TIME_IN_DATE) {
      continue;
    }

    const nextStartTimeInDate = parseTimeString(nextStartTime);

    const [_startTime, endTime] = timeSlot;
    const endTimeInDate = parseTimeString(endTime);

    const differenceInMinutes = getDifferenceInMinutes(
      nextStartTimeInDate,
      endTimeInDate
    );
    // Check if the gap has enough time for the meeting to be held (durationMinutes)
    if (differenceInMinutes > durationMinutes) {
      return [endTimeInDate, nextStartTimeInDate];
    }
  }

  return null;
};

export const findBestTime = (schedules: TimeSlot[][], durationMinutes: number) => {
  let largestStartTimeInDate: Date | null = null;

  for (const timeSlot of schedules) {
    // Testing
    // if (index !== 0) break

    const gap = findEarliestGap(timeSlot, durationMinutes);
    if (!gap) {
      continue;
    }

    const [startTimeInDate] = gap;
    if (!largestStartTimeInDate || startTimeInDate > largestStartTimeInDate) {
      largestStartTimeInDate = startTimeInDate;
    }
  }

  return largestStartTimeInDate;
};