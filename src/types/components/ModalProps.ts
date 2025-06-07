export interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}
