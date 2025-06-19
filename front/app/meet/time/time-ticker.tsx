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

interface TimeTickerProps {
  value: string;
  onSelect: (time: string) => void;
}

export function TimeTicker({ value, onSelect }: TimeTickerProps) {
  const [timeValue, setTimeValue] = React.useState<string>(value)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setTimeValue(value);
  }, [value]);

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handleTimeChange = (type: 'hour' | 'minute', val: string) => {
    let newTime = timeValue || '';
    const parts = newTime.split(':');
    let hour = parts[0] || '00';
    let minute = parts[1] || '00';

    if (type === 'hour') {
      hour = val.padStart(2, '0');
    } else if (type === 'minute') {
      minute = val.padStart(2, '0');
    }
    newTime = `${hour}:${minute}`;
    setTimeValue(newTime);
    onSelect(newTime);
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
                        String(hour).padStart(2, '0')
                        ? 'default'
                        : 'ghost'
                    }
                    className="aspect-square shrink-0 sm:w-full"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {String(hour).padStart(2, '0')}
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
                        String(minute).padStart(2, '0')
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
