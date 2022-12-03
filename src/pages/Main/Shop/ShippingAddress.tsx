import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useCartStore from '../../../store/useCart';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    address: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required(),
  })
  .required();

type FormValues = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const ShippingAddress = () => {
  const { setAddress, shippingAddress } = useCartStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setAddress(data);
    navigate('/placeorder');
  };

  return (
    <Row className='my-6 justify-content-center'>
      <Col md={6}>
        <Card className='shadow'>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId='address' className='mb-2'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder='address'
                  {...register('address', { value: shippingAddress?.address })}
                  className={errors.address?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.address?.message}</p>
              </Form.Group>
              <Form.Group controlId='city' className='mb-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder='city'
                  {...register('city', { value: shippingAddress?.city })}
                  className={errors.city?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.city?.message}</p>
              </Form.Group>
              <Form.Group controlId='postalCode' className='mb-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  className={errors.postalCode?.message && 'is-invalid'}
                  placeholder='postal code'
                  {...register('postalCode', {
                    value: shippingAddress?.postalCode,
                  })}
                />
                <p className='invalid-feedback'>{errors.postalCode?.message}</p>
              </Form.Group>
              <Form.Group controlId='country' className='mb-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  placeholder='country'
                  {...register('country', { value: shippingAddress?.country })}
                  className={errors.country?.message && 'is-invalid'}
                />
                <p className='invalid-feedback'>{errors.country?.message}</p>
              </Form.Group>
              <Form.Group className='mt-2'>
                <Button
                  type='submit'
                  className='w-full bg-green-500 btn-outline-white'
                >
                  Checkout
                </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ShippingAddress;
