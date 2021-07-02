import { forwardRef, ReactNode, InputHTMLAttributes, DetailedHTMLProps } from 'react'

import { TextInputContainer } from '../styles/components/text-input'

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, any>(function TextInputComponent ({ icon, ...props }: TextInputProps, ref) {
  return (
    <TextInputContainer>
      {icon}
      <input {...props} ref={ref} />
    </TextInputContainer>
  )
})
