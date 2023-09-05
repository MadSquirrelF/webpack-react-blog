import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose } : LoginModalProps) => (
    <Modal lazy className={classNames(styles.LoginModal, {}, [className])} isOpen={isOpen} onClose={onClose}>
        <LoginForm />
    </Modal>
);