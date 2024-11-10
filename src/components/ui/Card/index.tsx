import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  children: React.ReactNode
  className?: string
  headerButton?: React.ReactNode
}

const Card = ({ children, title, className, headerButton }: CardProps) => {
  
  return (
    <div className={cn('w-full h-full border border-black/10 rounded-lg p-8 flex flex-col gap-4', className)}>
      <div className='flex flex-row justify-between items-center'>
        <span className='text-2xl font-bold'>{title}</span>
        {headerButton}
      </div>
      {children}
    </div>
  )
}

export default Card
