import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <PageContainer title={'우리 만날까요?'}>
      <div className="flex flex-col gap-8">
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
