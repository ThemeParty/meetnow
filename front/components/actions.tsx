import { cn } from '@/lib/utils'

export const BottomActions = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn('fixed bottom-0 left-0 w-full p-4', className)}>
      {children}
    </div>
  )
}

export const ActionContainer = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn('fixed bottom-0 left-0 w-full p-4', className)}>
      <div className="flex justify-end gap-2">{children}</div>
    </div>
  )
}
