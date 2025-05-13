'use client'

import { useState } from 'react'

import { Calendar1 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { MultipleSelectCalendar } from './mutiple-select-calendar'
import { RangeSelectCalendar } from './range-select-calendar'
import { TimeTicker } from './time-ticker'

export const Body = () => {
  const [periodType, setPeirodType] = useState<string>('individual')
  return (
    <div className="mt-10">
      <div className="flex w-full justify-center px-6">
        <RadioGroup
          defaultValue="individual"
          // className="grid grid-cols-2 gap-4"
          className="flex w-full gap-4"
          onValueChange={setPeirodType}
        >
          <div className="w-full">
            <RadioGroupItem
              value="individual"
              id="individual"
              className="peer sr-only"
              //   onClick={onChangePeriodType}
            />
            <Label
              htmlFor="individual"
              className="flex flex-1 flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Calendar1 />
              날짜로 선택
            </Label>
          </div>
          <div className="w-full">
            <RadioGroupItem
              value="period"
              id="period"
              className="peer sr-only"
              //   onClick={onChangePeriodType}
            />
            <Label
              htmlFor="period"
              className="flex flex-1 flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Calendar1 />
              기간 선택
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mx-6 my-4 flex flex-col gap-2">
        <Label htmlFor="room">약속 이름</Label>
        <Input id="room" name="room" />
      </div>

      <div className="mx-6 my-4 flex flex-col gap-2">
        <Label htmlFor="calendar">약속 날짜</Label>
        <div className="flex justify-center">
          {periodType === 'individual' && <MultipleSelectCalendar />}
          {periodType === 'period' && <RangeSelectCalendar />}
        </div>
      </div>

      <div className="mx-6 my-4 flex flex-col gap-2">
        <Label htmlFor="time">시간대</Label>
        <div className="flex items-center gap-4">
          <TimeTicker />
          ~
          <TimeTicker />
        </div>
      </div>
    </div>
  )
}
