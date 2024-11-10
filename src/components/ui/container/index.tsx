const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full overflow-hidden flex flex-col flex-1">{children}</div>
}

export default Container
