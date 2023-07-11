import { retryFailures, createTargetFunction } from "./retryFailures";
import { defaultArguments } from "./defaultArguments";
import { TimeSlot, findBestTime } from "./timeslot";



/*
 * Question 1
 */

// succeeds on attempt number 3
retryFailures(createTargetFunction(3), 5).then((attempt) => {
  console.assert(attempt === 3);
});

// fails on attempt number 2 and throws last error
retryFailures(createTargetFunction(3), 2).catch((e) => {
  console.assert(e.attempt === 2);
});

// succeeds
retryFailures(createTargetFunction(10), 10).then((attempt) => {
  console.assert(attempt === 10);
});



/*
 * Question 2
 */

function add(a: number, b: number) {
    return a + b;
}

const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);

const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);

const add5 = defaultArguments(add2, { a: 10 }); //extends add2
console.assert(add5() === 19); // a=10, b=9



/*
 * Question 3
 */

const schedules: TimeSlot[][] = [
  [
    ["09:00", "11:30"],
    ["13:30", "16:00"],
    ["16:00", "17:30"],
    ["17:45", "19:00"],
  ],
  [
    ["09:15", "12:00"],
    ["14:00", "16:30"],
    ["17:00", "17:30"],
  ],
  [
    ["11:30", "12:15"],
    ["15:00", "16:30"],
    ["17:45", "19:00"],
  ],
];

const DURATION_MINUTES = 60;

const bestTime = findBestTime(schedules, DURATION_MINUTES);
console.info(
  `Best time would be.. ${
    bestTime ? bestTime.toLocaleTimeString() : "can't find one sorry!"
  }`
);
