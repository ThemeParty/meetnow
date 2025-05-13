import Link from 'next/link'

import { MoveRight } from 'lucide-react'

import { ActionContainer } from '@/components/actions'
import { PageContainer } from '@/components/page-container'
import { TitleBold } from '@/components/title'
import { Button } from '@/components/ui/button'

import { Body } from './body'

export default function Page() {
  return (
    <PageContainer
      title={
        <>
          우리 <br />
          <TitleBold>언제</TitleBold> 만날까요?
        </>
      }
    >
      <Body />

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
