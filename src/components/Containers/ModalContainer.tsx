import { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  title: string;
  show: boolean;
  handleClose: () => void;
  children: ReactNode;
};

const ModalContainer = ({ title, show, handleClose, children }: Props) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>{title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
