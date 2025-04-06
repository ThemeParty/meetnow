import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { BottomActions } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import { Places } from './places'

export default function Page() {
  return (
    <PageContainer title="우리 어디서 만날까요?">
      <div>
        <div>
          <div>친구들에게 5개까지 제안할 수 있어요. 투표로 결정돼요.</div>
          <div>
            <Places />
          </div>
        </div>

        <BottomActions className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="addingLater">친구도 장소를 추가할 수 있어요.</Label>
            <Switch id="addingLater" name="addingLater" />
          </div>

          <div className="flex justify-between gap-2">
            <Button variant="outline" className="flex gap-4" asChild>
              <Link href="/meet/time" replace>
                이전 단계로
              </Link>
            </Button>
            <Button className="flex gap-4" asChild>
              <Link href="/meet/made">
                다음으로 <MoveRight />
              </Link>
            </Button>
          </div>
        </BottomActions>
      </div>
    </PageContainer>
  )
}
