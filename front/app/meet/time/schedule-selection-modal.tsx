'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { MultipleSelectCalendar } from './mutiple-select-calendar'

interface ScheduleSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (data: {
    dates: string[]
    selectedTimes: string[]
  }) => void
  initialData?: {
    dates?: string[]
    selectedTimes?: string[]
  }
}

const generateTimeSlots = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      times.push(timeString)
    }
  }
  return times
}

export const ScheduleSelectionModal = ({
  open,
  onOpenChange,
  onConfirm,
  initialData
}: ScheduleSelectionModalProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>(initialData?.dates || [])
  const [selectedTimes, setSelectedTimes] = useState<string[]>(initialData?.selectedTimes || [])
  const timeSlots = generateTimeSlots()

  useEffect(() => {
    if (initialData) {
      setSelectedDates(initialData.dates || [])
      setSelectedTimes(initialData.selectedTimes || [])
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

  const handleTimeToggle = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time].sort()
    )
  }

  const handleConfirm = () => {
    onConfirm({
      dates: selectedDates,
      selectedTimes: selectedTimes
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
          <Card>
            <CardHeader>
              <CardTitle>날짜 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <MultipleSelectCalendar onSelect={handleDatesSelect} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>시간 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTimes.includes(time) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeToggle(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

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