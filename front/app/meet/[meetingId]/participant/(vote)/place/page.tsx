import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <PageContainer title="익명의 피자님, 우리 여기서 만나요!">
      <div>원하는 장소를 모두 선택해 주세요</div>

      <div>listing</div>

      <BottomActions>
        <div className="flex justify-between gap-2">
          <Button variant="outline" asChild>
            <Link href="">이전 단계로</Link>
          </Button>
          <Button asChild>
            <Link href="/meet/123/participant/456">
              다음으로 <MoveRight />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
