'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { MoveRight } from 'lucide-react'

import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

export default function Page() {
  const { meetingData, updateMeetingData } = useMeetingCreation();
  const [meetingName, setMeetingName] = useState(meetingData.name);

  useEffect(() => {
    setMeetingName(meetingData.name);
  }, [meetingData.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setMeetingName(newName);
    updateMeetingData({ name: newName });
  };

  return (
    <PageContainer title={'우리 만날까요?'}>
      <div className="flex flex-col gap-8">
        <Input
          type="text"
          placeholder="미팅 이름을 입력해주세요"
          value={meetingName}
          onChange={handleNameChange}
          className="text-center text-xl font-bold"
        />
        <div className="mt-20 flex items-center justify-center">
          <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gray-200">
            이미지
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="flex gap-4" asChild>
            <Link href="/meet/time">
              미팅룸 만들기 <MoveRight />
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
