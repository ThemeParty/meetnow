import Link from 'next/link'

import { Share2 } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <PageContainer title="그럼 우리 이날 여기서 만나요!">
      <div>~~~~이 현재 1위에요</div>
      <div>내 선호 시간은...</div>
      <div>내 선호 장소은...</div>

      <BottomActions>
        <div className="flex justify-between gap-2">
          <Button className="flex gap-4" asChild>
            <Link href="/meet/time">모임 수정하기</Link>
          </Button>
          <Button className="flex w-[36px] gap-4 rounded-full" asChild>
            <Link href="/meet/123/participant/time">
              <Share2 size="sm" />
            </Link>
          </Button>
        </div>
      </BottomActions>
    </PageContainer>
  )
}
