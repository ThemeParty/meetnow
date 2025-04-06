import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <PageContainer title="이렇게 약속을 만들까요?">
      <div>
        앞에서 정한 약속 정보 요약해서 보여주기 날짜를 어떻게 보여줄지 고민해야
        함
      </div>

      <BottomActions>
        <div className="flex justify-between gap-2">
          <Button variant="outline" className="flex gap-4" asChild>
            <Link href="/meet/time" replace>
              이전 단계로
            </Link>
          </Button>
          <Button className="flex gap-4" asChild>
            <Link href="/meet/place">
              end <MoveRight />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
