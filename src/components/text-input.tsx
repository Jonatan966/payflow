import { forwardRef, ReactNode, InputHTMLAttributes, DetailedHTMLProps } from 'react'

import { TextInputContainer } from '../styles/components/text-input'

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon: ReactNode;
  error?: {
    message: string
  };
  children?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInputComponent ({
  icon,
  children,
  readOnly,
  error,
  ...props
}: TextInputProps, ref) {
  return (
    <TextInputContainer>
      <div className={`input-content ${error ? 'error' : ''} ${readOnly ? 'read-only' : ''}`}>
        {icon}
        <input {...props} ref={ref} readOnly={readOnly} />
        {children}
      </div>
      {!!error && <span>{error?.message}</span>}
    </TextInputContainer>
  )
})
