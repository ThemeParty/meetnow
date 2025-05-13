'use client'

import * as React from 'react'

import { TimerIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

export function TimeTicker() {
  const [timeValue, setTime] = React.useState<string>()
  const [isOpen, setIsOpen] = React.useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    if (value) {
      const timeValues = timeValue?.split(':') || []

      if (type === 'hour') {
        setTime(`${value}:${timeValues?.[1] || ''}`)
      } else if (type === 'minute') {
        setTime(`${timeValues?.[0] || ''}:${value}`)
      }
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !timeValue && 'text-muted-foreground',
          )}
        >
          <TimerIcon className="mr-2 h-4 w-4" />
          {timeValue ? timeValue : <span>hh:mm</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
          <div className="flex items-center justify-center divide-y sm:h-[300px] sm:flex-col sm:divide-x sm:divide-y-0">
            <div className="flex aspect-square h-9 w-9 shrink-0 items-center justify-center p-2 sm:w-full sm:flex-col">
              시
            </div>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col sm:pt-0">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      timeValue &&
                      timeValue.split(':')[0] ===
                        String(hour === 0 ? '00' : hour)
                        ? 'default'
                        : 'ghost'
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
          <div className="flex items-center justify-center divide-y sm:h-[300px] sm:flex-col sm:divide-x sm:divide-y-0">
            <div className="flex aspect-square h-9 w-9 shrink-0 items-center justify-center p-2 sm:w-full sm:flex-col">
              분
            </div>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex p-2 sm:flex-col sm:pt-0">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      timeValue &&
                      timeValue.split(':')[1] ===
                        String(minute === 0 ? '00' : minute)
                        ? 'default'
                        : 'ghost'
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() =>
                      handleTimeChange('minute', minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
