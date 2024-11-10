'use client'

import * as React from 'react'
import { format, parse } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import MaskedInput from '../MaskedInput'

import { cva } from 'class-variance-authority'

type DatePickerProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string
  onChange: (value: string) => void
  variant?: 'default'
  className?: string,
}

const inputVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#F2F2F2] text-[#F2F2F2]/2 hover:bg-[#F2F2F2]/90 border-black-opacity-10 text-[#868686]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const DatePicker = ({
  value,
  onChange,
  variant,
  className,
  placeholder,
  ...props
}: DatePickerProps) => {
  const [date, setDate] = React.useState<Date>()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSelectDate = (value: Date) => {
    setDate(value)
    setIsOpen(false)
  }

  const formatDate = (value: string) => {
    if (typeof value !== 'string') return value
    return parse(value, 'dd/MM/yyyy', new Date())
  }

  React.useEffect(() => {
    if (date) {
      onChange(format(date, 'dd/MM/yyyy'))
    }
  }, [date, onChange])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          inputVariants({
            variant,
          }),
          className
        )}
      >
        <MaskedInput
          value={value}
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-full h-full py-1 border-none"
          onChange={onChange}
          mask="##/##/####"
          placeholder={placeholder || ''}
        />
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'border-none bg-transparent',
              !date && 'text-muted-foreground'
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          {...props}
          mode="single"
          selected={formatDate(value)}
          onSelect={handleSelectDate}
          required
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
