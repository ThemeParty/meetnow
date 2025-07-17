import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page({ params }: { params: { meetingId: string } }) {
  return (
    <PageContainer title="우리 만날까요?">
      <div className='p-4'>
        <div>~~~~이 현재 1위에요</div>

        <BottomActions>
          <div className="flex justify-between gap-2">
            <Button className="flex gap-4" asChild>
              <Link href="/meet/time">모임 수정하기</Link>
            </Button>
            <Button className="flex gap-4" asChild>
              <Link href={`/meet/${params.meetingId}/participant/time`}>

                다음으로 <MoveRight />
              </Link>
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
