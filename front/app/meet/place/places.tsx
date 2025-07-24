'use client'
import { useEffect, useRef, useState } from 'react'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Places() {
  const [places, setPlaces] = useState<string[]>([])
  const { updateMeetingData } = useMeetingCreation()

  useEffect(() => {
    updateMeetingData({ places })
  }, [places])

  const ref = useRef<HTMLInputElement>(null)

  const onAdd = () => {
    const value = ref.current!.value.trim()
    if (value === '') return
    setPlaces((old) => [...old, value])
    ref.current!.value = ''
  }

  const onDelete = (index: number) => {
    setPlaces((old) => {
      const _tmp = [...old]
      _tmp.splice(index, 1)
      return _tmp
    })
  }

  return (
    <div>
      <Label htmlFor="place">약속 장소</Label>
      <div className="mt-1">
        <div className="flex gap-4">
          <Input
            id="place"
            name="place"
            ref={ref}

            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (!e.nativeEvent.isComposing) {
                  onAdd()
                }
              }
            }}
          />
          <Button onClick={onAdd}>추가</Button>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {places.map((place, index) => {
          return (
            <li key={place}>
              <div className="flex gap-4">
                <div className="flex flex-1">
                  <span className="w-7 p-2">{index + 1}</span>
                  <span className="flex-1 rounded-sm border p-2">{place}</span>
                </div>
                <Button
                  size="sm"
                  className="mt-1 min-w-[56px] bg-gray-200 text-gray-800 hover:bg-gray-200/50"
                  onClick={() => onDelete(index)}
                >
                  삭제
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
