import { Input } from '../Input'
import { applyMask } from '@/core/utils/dataFormat'

type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: string
  value: string
  onChange: (value: string) => void
  onlyNumeric?: boolean
}

const MaskedInput = ({ mask, value, onChange, ...props }: MaskedInputProps) => {
  return (
    <Input
      value={value ? applyMask(value, mask) : ''}
      onChange={(e) => {
        onChange(applyMask(e.target.value, mask))
      }}
      {...props}
    />
  )
}

export default MaskedInput
