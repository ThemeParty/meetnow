'use client'

import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

type RangeSelectCalendar = {
  onSelect?: (dates?: Date[]) => void
}
export const RangeSelectCalendar = (props: RangeSelectCalendar) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>()

  const onSelect = (dates?: Date[]) => {
    setSelectedDays(dates)
    props.onSelect?.(dates)
  }

  return (
    <Calendar
      className="rounded-md border"
      mode="multiple"
      selected={selectedDays}
      onSelect={onSelect}
    />
  )
}
