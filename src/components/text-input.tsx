import { ReactNode, InputHTMLAttributes, DetailedHTMLProps } from 'react'

import { TextInputContainer } from '../styles/components/text-input'

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon: ReactNode;
}

export function TextInput ({ icon, ...props } : TextInputProps) {
  return (
    <TextInputContainer>
      {icon}
      <input {...props} />
    </TextInputContainer>
  )
}
