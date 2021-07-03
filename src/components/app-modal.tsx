import { ReactNode } from 'react'
import Modal from 'react-modal'

interface AppModalProps {
  children?: ReactNode;
  className?: string;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function AppModal ({ isOpen, onRequestClose, children, className }: AppModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={`modal-overlay ${isOpen ? 'modal-enter-anim' : 'modal-out-anim'}`}
      className={className}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  )
}
