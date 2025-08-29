'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { MultipleSelectCalendar } from './mutiple-select-calendar'

interface ScheduleSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (schedules: { date: string; time: string }[]) => void
  initialData?: {
    dates?: string[]
    selectedTimes?: string[]
  }
}

const generateTimeSlots = () => {
  const morningTimes = []
  const afternoonTimes = []

  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      if (hour < 12) {
        morningTimes.push(timeString)
      } else {
        afternoonTimes.push(timeString)
      }
    }
  }
  return { morningTimes, afternoonTimes }
}

export const ScheduleSelectionModal = ({
  open,
  onOpenChange,
  onConfirm,
  initialData,
}: ScheduleSelectionModalProps) => {
  const [selectedDates, setSelectedDates] = useState<string[]>(
    initialData?.dates || [],
  )
  const [selectedTimes, setSelectedTimes] = useState<string[]>(
    initialData?.selectedTimes || [],
  )
  const { morningTimes, afternoonTimes } = generateTimeSlots()

  useEffect(() => {
    if (initialData) {
      setSelectedDates(initialData.dates || [])
      setSelectedTimes(initialData.selectedTimes || [])
    }
  }, [initialData])

  const handleDatesSelect = (dates?: Date[]) => {
    if (dates) {
      const formattedDates = dates.map(
        (date) => date.toISOString().split('T')[0],
      )
      setSelectedDates(formattedDates)
    } else {
      setSelectedDates([])
    }
  }

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time)
        ? prev.filter((t) => t !== time)
        : [...prev, time].sort(),
    )
  }

  const handleConfirm = () => {
    const schedules = selectedDates.flatMap(date => 
      selectedTimes.map(time => ({ date, time }))
    )
    onConfirm(schedules)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>일정 선택</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>날짜 선택</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex justify-center">
                <MultipleSelectCalendar onSelect={handleDatesSelect} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>시간 선택</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">오전</h4>
                  <div className="grid grid-cols-3 gap-1">
                    {morningTimes.map((time) => (
                      <Button
                        key={time}
                        variant={
                          selectedTimes.includes(time) ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => handleTimeToggle(time)}
                        className="text-xs px-1"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">오후</h4>
                  <div className="grid grid-cols-3 gap-1">
                    {afternoonTimes.map((time) => (
                      <Button
                        key={time}
                        variant={
                          selectedTimes.includes(time) ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => handleTimeToggle(time)}
                        className="text-xs px-1"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button onClick={handleConfirm}>확인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
