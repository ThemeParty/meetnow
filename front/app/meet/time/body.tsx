'use client'

import { useState, useEffect } from 'react'

import { Calendar1 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

import { MultipleSelectCalendar } from './mutiple-select-calendar'
import { RangeSelectCalendar } from './range-select-calendar'
import { TimeTicker } from './time-ticker'

export const Body = () => {
  const { meetingData, updateMeetingData } = useMeetingCreation();
  const [periodType, setPeriodType] = useState<string>(meetingData.duration || 'individual');
  const [startTime, setStartTime] = useState<string>(meetingData.times[0] || '');
  const [endTime, setEndTime] = useState<string>(meetingData.times[1] || '');
  const [meetingName, setMeetingName] = useState(meetingData.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setMeetingName(newName);
    updateMeetingData({ name: newName });
  };

  useEffect(() => {
    setMeetingName(meetingData.name);
  }, [meetingData.name]);

  useEffect(() => {
    updateMeetingData({ duration: periodType });
  }, [periodType]);

  useEffect(() => {
    updateMeetingData({ times: [startTime, endTime] });
  }, [startTime, endTime]);

  const handleDatesSelect = (dates?: Date[]) => {
    if (dates) {
      const formattedDates = dates.map(date => date.toISOString().split('T')[0]);
      updateMeetingData({ dates: formattedDates });
    } else {
      updateMeetingData({ dates: [] });
    }
  };

  return (
    <div className="mt-10 mb-20">
      <div className="mx-6 my-4 flex flex-col gap-2">
        <Label>약속 이름</Label>
        <Input
          type="text"
          placeholder="미팅 이름을 입력해주세요"
          value={meetingName}
          onChange={handleNameChange}
          className="text-xl font-bold border rounded p-2 mb-4 w-full"
        />
      </div>

      <div className="flex w-full justify-center px-6">
        <RadioGroup
          defaultValue="individual"
          className="flex w-full gap-4"
          onValueChange={setPeriodType}
          value={periodType}
        >
          <div className="w-full">
            <RadioGroupItem
              value="individual"
              id="individual"
              className="peer sr-only"
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
        <Label htmlFor="calendar">약속 날짜</Label>
        <div className="flex justify-center">
          {periodType === 'individual' && <MultipleSelectCalendar onSelect={handleDatesSelect} />}
          {periodType === 'period' && <RangeSelectCalendar onSelect={handleDatesSelect} />}
        </div>
      </div>

      <div className="mx-6 my-4 flex flex-col gap-2">
        <Label htmlFor="time">시간대</Label>
        <div className="flex items-center gap-4">
          <TimeTicker value={startTime} onSelect={setStartTime} />
          ~
          <TimeTicker value={endTime} onSelect={setEndTime} />
        </div>
      </div>
    </div>
  )
}
