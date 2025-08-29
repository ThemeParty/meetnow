'use client'

import { useState, useEffect } from 'react'

import { Calendar1, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMeetingCreation } from '@/lib/context/MeetingCreationContext'

import { ScheduleSelectionModal } from './schedule-selection-modal'

export const Body = () => {
  const { meetingData, updateMeetingData } = useMeetingCreation();
  const [meetingName, setMeetingName] = useState(meetingData.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<Array<{
    id: string;
    date: string;
    time: string;
  }>>(meetingData.schedules.map((s, index) => ({ ...s, id: `init-${index}` })));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setMeetingName(newName);
    updateMeetingData({ name: newName });
  };

  useEffect(() => {
    setMeetingName(meetingData.name);
  }, [meetingData.name]);

  const handleAddSchedule = (scheduleData: { date: string; time: string }[]) => {
    const newSchedules = scheduleData.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      date: item.date,
      time: item.time
    }));
    
    const allSchedules = [...schedules, ...newSchedules];
    setSchedules(allSchedules);
    
    // meetingData 업데이트 - 개별 일정과 날짜/시간 요약 정보 모두 저장
    const uniqueDates = [...new Set(allSchedules.map(s => s.date))];
    const uniqueTimes = [...new Set(allSchedules.map(s => s.time))].sort();
    const schedulesForContext = allSchedules.map(s => ({ date: s.date, time: s.time }));
    
    updateMeetingData({
      duration: 'individual',
      dates: uniqueDates,
      times: uniqueTimes.length > 0 ? [uniqueTimes[0], uniqueTimes[uniqueTimes.length - 1]] : ['', ''],
      schedules: schedulesForContext
    });
  };

  const handleRemoveSchedule = (id: string) => {
    const newSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(newSchedules);
    
    // meetingData 업데이트 - 남은 일정들로부터 날짜와 시간 추출
    if (newSchedules.length > 0) {
      const uniqueDates = [...new Set(newSchedules.map(s => s.date))];
      const uniqueTimes = [...new Set(newSchedules.map(s => s.time))].sort();
      const schedulesForContext = newSchedules.map(s => ({ date: s.date, time: s.time }));
      updateMeetingData({
        duration: 'individual',
        dates: uniqueDates,
        times: uniqueTimes.length > 0 ? [uniqueTimes[0], uniqueTimes[uniqueTimes.length - 1]] : ['', ''],
        schedules: schedulesForContext
      });
    } else {
      updateMeetingData({
        duration: 'individual',
        dates: [],
        times: ['', ''],
        schedules: []
      });
    }
  };

  return (
    <div className="mt-10">
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

      <div className="mx-6 my-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label>일정</Label>
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            일정 추가
          </Button>
        </div>

        {schedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Calendar1 className="h-12 w-12 mb-4" />
            <p>아직 선택된 일정이 없습니다.</p>
            <p className="text-sm">일정 추가 버튼을 눌러 일정을 추가해보세요.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar1 className="h-4 w-4" />
                    <span className="font-medium">일정</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>날짜: {schedule.date}</p>
                    <p>시간: {schedule.time}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => handleRemoveSchedule(schedule.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ScheduleSelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleAddSchedule}
      />
    </div>
  )
}
