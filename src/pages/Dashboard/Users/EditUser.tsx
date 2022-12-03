import { Form, Button, Row, Alert, Container, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { setError } from '../../../utils/error';
import { getUserById, updateUser } from '../../../lib/api/user';

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    role: yup.string().required(),
  })
  .required();

type FormValues = {
  username: string;
  email: string;
  role: string;
};

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['UsersFilter', id],
    queryFn: () => getUserById(id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ProductsFilter'] });
      toast.success('user has been updated');
      navigate('/dashboard/user-list');
      reset();
    },
  });

  const onSubmit = (data: FormValues) => {
    createProductMutation.mutate({ ...data, id });
  };

  return (
    <Container className='my-6'>
      {isLoading || !user ? (
        <LoaderIcon />
      ) : (
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {createProductMutation.isError && (
                <Alert variant='danger'>
                  {setError(createProductMutation.error)}
                </Alert>
              )}
              <Row>
                <Form.Group className='mb-4' controlId='username'>
                  <Form.Label className='text-lg'>Username</Form.Label>
                  <Form.Control
                    placeholder='username'
                    {...register('username', { value: user.username })}
                    className={errors.username?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.username?.message}</p>
                </Form.Group>
                <Form.Group className='mb-4' controlId='email'>
                  <Form.Label className='text-lg'>Email</Form.Label>
                  <Form.Control
                    placeholder='Email'
                    {...register('email', { value: user.email })}
                    className={errors.email?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.email?.message}</p>
                </Form.Group>
                <Form.Group className='mb-4' controlId='role'>
                  <Form.Label className='text-lg'>Role</Form.Label>
                  <Form.Select
                    defaultValue={user.role}
                    placeholder='Price'
                    {...register('role', { value: user.role })}
                    className={errors.role?.message && 'is-invalid'}
                  >
                    <option value={user.role === 'admin' ? 'admin' : 'client'}>
                      {user.role === 'admin' ? 'admin' : 'client'}
                    </option>
                    <option value={user.role === 'admin' ? 'client' : 'admin'}>
                      {user.role === 'admin' ? 'client' : 'admin'}
                    </option>
                  </Form.Select>
                  <p className='invalid-feedback'>{errors.role?.message}</p>
                </Form.Group>

                <Form.Group className='mt-2'>
                  <Button type='submit' className='w-full'>
                    Update User
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EditUser;
