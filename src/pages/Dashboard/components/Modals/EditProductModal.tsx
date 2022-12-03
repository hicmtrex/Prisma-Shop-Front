import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import ModalContainer from '../../../../components/Containers/ModalContainer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProduct,
  getProductById,
  updateProduct,
} from '../../../../lib/api/products';
import { CreateProductValues } from '../../../../utils/types/product.type';
import { LoaderIcon } from 'react-hot-toast';

const schema = yup
  .object({
    name: yup.string().required(),
    image: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    brand: yup.string().required(),
  })
  .required();

type Props = {
  show: boolean;
  id: string;
  handleClose: () => void;
};

const EditProductModal = ({ show, handleClose, id }: Props) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ['Product'],
    queryFn: () => getProductById(id),

    refetchOnMount: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductValues>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ProductsFilter'] });
      handleClose();
      reset();
    },
  });

  const onSubmit = (data: CreateProductValues) => {
    createProductMutation.mutate({ ...data, id });
  };

  return (
    <ModalContainer show={show} handleClose={handleClose} title='Edit Product'>
      {isLoading || !product ? (
        <LoaderIcon />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {createProductMutation.isError && <Alert>Z</Alert>}
          <Row>
            <Col md={12}>
              <Form.Group className='mb-4' controlId='image'>
                <Form.Label className='text-lg'>Image Url</Form.Label>
                <Form.Control
                  placeholder='Image Url'
                  {...register('image', { value: product.image })}
                  className={errors.image?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.image?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-4' controlId='name'>
                <Form.Label className='text-lg'>Name</Form.Label>
                <Form.Control
                  placeholder='name'
                  {...register('name', { value: product.name })}
                  className={errors.name?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.name?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-4' controlId='price'>
                <Form.Label className='text-lg'>Price</Form.Label>
                <Form.Control
                  placeholder='Price'
                  {...register('price', { value: product.price })}
                  className={errors.price?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.price?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-4' controlId='category'>
                <Form.Label className='text-lg'>Category</Form.Label>
                <Form.Control
                  placeholder='Category'
                  {...register('category', { value: product?.category })}
                  className={errors.category?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.category?.message}</p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-4' controlId='brand'>
                <Form.Label className='text-lg'>Brand</Form.Label>
                <Form.Control
                  placeholder='Brand'
                  {...register('brand', { value: product?.brand })}
                  className={errors.brand?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.brand?.message}</p>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className='mb-4' controlId='description'>
                <Form.Label className='text-lg'>Description</Form.Label>
                <Form.Control
                  as={'textarea'}
                  rows={5}
                  placeholder='Description'
                  {...register('description', { value: product?.description })}
                  className={errors.description?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>
                  {errors.description?.message}
                </p>
              </Form.Group>
            </Col>
            <Form.Group className='mt-2' controlId='email'>
              <Button type='submit' className='w-full'>
                Create New Product
              </Button>
            </Form.Group>
          </Row>
        </Form>
      )}
    </ModalContainer>
  );
};

export default EditProductModal;
