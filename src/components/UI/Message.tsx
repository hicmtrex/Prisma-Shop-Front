import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  variant: string;
  children: ReactNode;
};

const Message = ({ variant, children }: Props) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
