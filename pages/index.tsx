
import Head from 'next/head'
import Image from 'next/image'
import React from 'react';

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs'
// Then, include dayjs-business-time
import dayjsBusinessTime from 'dayjs-business-time';

// Attach dayjs plugin
dayjs.extend(dayjsBusinessTime);


const rangeStrings = [
  ['2019-03-04 00:15', '2019-03-04 01:45'],
  ['2019-03-05 09:00', '2019-03-05 10:30'],
  ['2019-03-06 22:00', '2019-03-06 22:30'],
  ['2019-03-07 01:30', '2019-03-07 03:00'],
  ['2019-03-07 05:30', '2019-03-07 10:00'],
  ['2019-03-08 12:30', '2019-03-08 01:30'],
  ['2019-03-09 22:00', '2019-03-09 23:59'],
];

const defaultSchedule = rangeStrings.map(range =>
  range.map(dateString => new Date(dateString)),
);


export default function Home() {
  const [schedule, setSchedule] = useState(defaultSchedule);

  // Create your Business Week definition
const businessTimes = {
  sunday: null,
  monday: [
    { start: '08:30:00', end: '12:30:00' },
    { start: '14:00:00', end: '18:00:00' }
  ],
  tuesday: [
    { start: '08:30:00', end: '12:30:00' },
    { start: '14:00:00', end: '18:00:00' }
  ],
  wednesday: [
    { start: '08:30:00', end: '12:30:00' },
    { start: '14:00:00', end: '18:00:00' }
  ],
  thursday: [
    { start: '08:30:00', end: '12:30:00' },
    { start: '14:00:00', end: '18:00:00' }
  ],
  friday: [
    { start: '08:30:00', end: '12:30:00' },
    { start: '14:00:00', end: '18:00:00' }
  ],
  saturday: [
    { start: '08:30:00', end: '12:30:00' },
  ],
}

// Set Business Times in dayjs
dayjs.setBusinessTime(businessTimes);


  const [startAt, setStartAt] = useState<Dayjs>()
  const [endsAt, setEndsAt] = useState<Dayjs>()

  const [difference, setDifference] = useState<number>()


  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center'}}>
    <label htmlFor="start">Activity startAt</label>
    <input id='start' type="datetime-local" onChange={ (e)=> setStartAt(dayjs(e.currentTarget.value)) } />
    <label htmlFor="end">Ends At</label>
    <input id='end' type="datetime-local" onChange={ (e)=> setEndsAt(dayjs(e.currentTarget.value)) } />
    <button onClick={()=> startAt && endsAt && setDifference(startAt.businessMinutesDiff(endsAt))}>Calculate elapsed time</button>
    {/* {startAt + ' - ' + endsAt} */}
    <span>{difference}</span>
    {
      difference && Math.floor(difference / 60) + 'h' + difference % 60
    }
    <div>{businessTimes.toString()}</div>
    </div>
  );
}
