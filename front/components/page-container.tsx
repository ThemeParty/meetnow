export const PageContainer = ({
  title,
  children,
}: {
  title?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className="min-v-screen relative">
      {title ? title : <></>}
      <div>{children}</div>
    </div>
  )
}
