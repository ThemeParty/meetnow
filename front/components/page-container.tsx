export const PageContainer = ({
  title,
  children,
}: {
  title?: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <div className="min-v-screen relative">
      <h1 className="ml-6 mt-16 mr-4 text-4xl">{title}</h1>
      <div>{children}</div>
    </div>
  )
}

const Title = ({ title }: { title: React.ReactNode }) => {
  if (!title || !isString(title)) {
    return title
  }

  const convertedTitle = `${title.substring(0, 2)}<br/>${title.substring(2)}`
  return <span dangerouslySetInnerHTML={{ __html: convertedTitle }} />
}

const isString = (title: any): title is String => (typeof title ? true : false)
