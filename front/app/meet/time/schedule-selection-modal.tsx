'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { MultipleSelectCalendar } from './mutiple-select-calendar'
import { TimeTicker } from './time-ticker'

interface ScheduleSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: {
    dates: string[]
    startTime: string
    endTime: string
  }) => void
  initialData?: {
    dates?: string[]
    startTime?: string
    endTime?: string
  }
}

export const ScheduleSelectionModal = ({
  open,
  onOpenChange,
  onConfirm,
  initialData
}: ScheduleSelectionModalProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>(initialData?.dates || [])
  const [startTime, setStartTime] = useState<string>(initialData?.startTime || '')
  const [endTime, setEndTime] = useState<string>(initialData?.endTime || '')

  useEffect(() => {
    if (initialData) {
      setSelectedDates(initialData.dates || [])
      setStartTime(initialData.startTime || '')
      setEndTime(initialData.endTime || '')
    }
  }, [initialData])

  const handleDatesSelect = (dates?: Date[]) => {
    if (dates) {
      const formattedDates = dates.map(date => date.toISOString().split('T')[0])
      setSelectedDates(formattedDates)
    } else {
      setSelectedDates([])
    }
  }

  const handleConfirm = () => {
    onConfirm({
      dates: selectedDates,
      startTime,
      endTime
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>일정 선택</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="calendar">약속 날짜</Label>
            <div className="flex justify-center">
              <MultipleSelectCalendar onSelect={handleDatesSelect} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="time">시간대</Label>
            <div className="flex items-center gap-4">
              <TimeTicker value={startTime} onSelect={setStartTime} />
              ~
              <TimeTicker value={endTime} onSelect={setEndTime} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button onClick={handleConfirm}>
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}