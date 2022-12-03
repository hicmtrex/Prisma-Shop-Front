import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuth';
import { useEffect } from 'react';

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')]),
  })
  .required();

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { user, userRegister } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    userRegister(data);
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='mb-4' controlId='username'>
        <Form.Label className='text-lg'>Username</Form.Label>
        <Form.Control
          placeholder='username'
          {...register('username')}
          className={errors.username?.message && 'is-invalid'}
        />
        <p className='invalid-feedback'>{errors.username?.message}</p>
      </Form.Group>
      <Form.Group className='mb-4' controlId='email'>
        <Form.Label className='text-lg'>Email</Form.Label>
        <Form.Control
          placeholder='email'
          {...register('email')}
          className={errors.email?.message && 'is-invalid'}
        />
        <p className='invalid-feedback'>{errors.email?.message}</p>
      </Form.Group>
      <Form.Group className='mb-4' controlId='password'>
        <Form.Label className='text-lg'>Password</Form.Label>
        <Form.Control
          placeholder='********'
          type='password'
          {...register('password')}
          className={errors.password?.message && 'is-invalid'}
        />
        <p className='invalid-feedback'>{errors.password?.message}</p>
      </Form.Group>
      <Form.Group className='mb-4' controlId='confirmPassword'>
        <Form.Label className='text-lg'>Confirm Password</Form.Label>
        <Form.Control
          placeholder='********'
          type='password'
          {...register('confirmPassword')}
          className={errors.confirmPassword?.message && 'is-invalid'}
        />
        <p className='invalid-feedback'>{errors.confirmPassword?.message}</p>
      </Form.Group>
      <Form.Group className='mt-2'>
        <Button type='submit' className='w-full'>
          Register
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Register;
