const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-8 w-full h-full flex flex-col flex-1 gap-4 overflow-auto scrollbar scrollbar-thumb-primary scrollbar-w-2">{children}</div>
}

export default ContentWrapper
