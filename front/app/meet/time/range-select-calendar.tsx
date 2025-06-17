'use client'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Calendar } from '@/components/ui/calendar'

type RangeSelectCalendar = {
  onSelect?: (dates?: Date[]) => void
}
export const RangeSelectCalendar = (props: RangeSelectCalendar) => {
  const [range, setRange] = useState<DateRange | undefined>()

  const onSelect = (range?: DateRange) => {
    setRange(range)
    if (range?.from && range?.to) {
      // Generate all dates within the range
      const dates: Date[] = [];
      let currentDate = new Date(range.from);
      while (currentDate <= range.to) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      props.onSelect?.(dates);
    } else {
      props.onSelect?.(undefined);
    }
  }

  return (
    <Calendar
      className="rounded-md border"
      mode="range"
      selected={range}
      onSelect={onSelect}
    />
  )
}
