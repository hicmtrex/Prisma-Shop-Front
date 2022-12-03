import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Card, Col, Form, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { updateUser } from '../../../lib/api/user';
import { setError } from '../../../utils/error';
import { formatDate } from '../../../utils/formater';
import { customToast } from '../../../utils/toast';
import { UserFullInfo } from '../../../utils/types/user.type';

type Props = {
  user: UserFullInfo;
};
const UserInfo = ({ user }: Props) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user?.email);
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onError(error) {
      customToast('error', setError(error));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['UserDetails'] });
      toast.success('user has been updated');
      setEdit(false);
    },
  });

  const updateHandler = () => {
    updateUserMutation.mutate({
      username,
      email,
      role: user.role,
      id: user.id,
    });
  };
  return (
    <Col md={4}>
      <Card>
        <div className='d-flex justify-content-center align-items-center'>
          <Card.Img
            src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
            variant='top'
            className=' h-56 w-56'
          />
        </div>
        {edit ? (
          <Card.Body>
            <Form>
              <Form.Group controlId='username' className='mb-2'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  size='sm'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId='email' className='mb-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  size='sm'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        ) : (
          <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-center'>
              <h3> {user.username}</h3>
              <h4> {user.role}</h4>
            </Card.Title>
            <Card.Subtitle className='text-gray-500 d-flex justify-content-between align-items-center'>
              <h5 className='text-gray-500'>{user.email}</h5>
              <h6 className='text-gray-500'>{formatDate(user.createdAt)}</h6>
            </Card.Subtitle>
          </Card.Body>
        )}
        {edit ? (
          <Stack
            direction='horizontal'
            className='m-3 gap-8 justify-content-center'
          >
            <Button onClick={updateHandler} size='sm' variant='success'>
              Change
            </Button>
            <Button onClick={() => setEdit(false)} size='sm' variant='danger'>
              Cancel
            </Button>
          </Stack>
        ) : (
          <Button
            onClick={() => setEdit(true)}
            size='sm'
            className='my-3 bg-green-500 btn-outline-white mx-5'
          >
            Change Profile
          </Button>
        )}
      </Card>
    </Col>
  );
};

export default UserInfo;
