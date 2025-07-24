'use client'
import { use, useState } from 'react'

import { Copy, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'

export default function Page({
  params,
}: {
  params: Promise<{ meetingId: string }>
}) {
  const { meetingId } = use(params)
  const shareUrl = `${window.location.origin}/meet/${meetingId}/participant`
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setIsCopied(true)
      toast.success('링크가 복사되었습니다')
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast.error('링크 복사에 실패했습니다')
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '만날 시간을 정해보세요',
          text: '약속 시간을 정해주세요!',
          url: shareUrl,
        })
      } else {
        handleCopyLink()
      }
    } catch (err) {
      // Sharing was cancelled
    }
  }

  return (
    <PageContainer title="우리 곧 만나요!">
      <div className="fixed inset-x-0 bottom-0 flex justify-center gap-3 bg-white p-4 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        <Button
          variant="outline"
          className="h-12 flex-1 gap-2 text-lg"
          onClick={handleCopyLink}
        >
          <Copy className="h-5 w-5" />
          {isCopied ? '복사됨!' : '링크 복사'}
        </Button>
        <Button
          className="h-12 flex-1 gap-2 bg-primary text-lg hover:bg-primary/90"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          공유하기
        </Button>
      </div>
    </PageContainer>
  )
}
