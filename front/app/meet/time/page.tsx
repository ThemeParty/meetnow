import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { ActionContainer } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Page() {
  return (
    <PageContainer title="우리 언제 만날까요?">
      <div>
        <div className="flex gap-2">
          <div className="rouned-sm min-w-24 border p-8">multiple pick</div>
          <div className="rouned-sm min-w-24 border p-8">range</div>
        </div>
        <div>
          <Calendar />
        </div>
        <div>
          <div>
            <Label htmlFor="time">시간대</Label>
            <Input id="time" name="time" />
          </div>
        </div>
      </div>

      <ActionContainer>
        <Button className="flex gap-4" asChild>
          <Link href="/meet/place">
            다음으로 <MoveRight />
          </Link>
        </Button>
      </ActionContainer>
    </PageContainer>
  )
}
