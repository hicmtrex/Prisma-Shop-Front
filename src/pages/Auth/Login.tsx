import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuth';
import { customToast } from '../../utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { userLogin, user, token } = useAuthStore((state) => state);
  const userLoginMutation = useMutation(userLogin, {
    onError: (error: any) => {
      customToast('error', error?.response?.data?.message);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLoginMutation.mutate(formData);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className='mb-4' controlId='email'>
        <Form.Label className='text-lg'>Email</Form.Label>
        <Form.Control
          onChange={onChange}
          name='email'
          value={formData.email}
          placeholder='email'
        />
      </Form.Group>
      <Form.Group className='mb-4' controlId='email'>
        <Form.Label className='text-lg'>Password</Form.Label>
        <Form.Control
          onChange={onChange}
          value={formData.password}
          name='password'
          placeholder='*******'
          type='password'
        />
      </Form.Group>
      <Form.Group className='mt-2' controlId='email'>
        <Button type='submit' className='w-full'>
          Login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Login;
