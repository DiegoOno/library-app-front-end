const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-h-[calc(100vh-172px)] overflow-hidden flex flex-col flex-1">{children}</div>
}

export default Container
