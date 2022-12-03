import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../../components/UI/Message';
import { createOrder } from '../../../lib/api/orders';
import useAuthStore from '../../../store/useAuth';
import useCartStore from '../../../store/useCart';
import { setError } from '../../../utils/error';
import { formatCurrencry } from '../../../utils/formater';
import { customToast } from '../../../utils/toast';
import { ProductType } from '../../../utils/types/product.type';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, resetCart, deleteFromCart } =
    useCartStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onError(error) {
      customToast('error', setError(error));
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['ProductsFilter'] });
      navigate(`/orders/${data.id}`);
      resetCart();
    },
  });

  const itemsPrice = cartItems.reduce<any>(
    (accumulator: any, currentValue: ProductType) =>
      accumulator + currentValue.price * currentValue.qty,
    0
  ) as any;

  const taxPrice = itemsPrice * 0.1;
  const shippingPrice = itemsPrice >= 500 ? 0 : 30;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const createOrderHandler = () => {
    const newOrder = { cartItems, totalPrice, shippingAddress };
    if (user) {
      createOrderMutation.mutate(newOrder);
    } else {
      navigate('/auth');
    }
  };

  return (
    <Row>
      <Col md={8}>
        {!cartItems.length ? (
          <Message variant='danger'>
            No Items in The Basket{' '}
            <Link className='ms-2' to='/'>
              Go Shop
            </Link>
          </Message>
        ) : (
          <ListGroup variant='fuish' className='bg-white shadow'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className='align-items-center'>
                  <Col md={2}>
                    <Image src={item.image} roundedCircle />
                  </Col>

                  <Col md={4}>
                    <h4>{item.name}</h4>
                  </Col>
                  <Col md={2}>
                    <h5>${(item.price * item.qty).toFixed(2)}</h5>
                  </Col>
                  <Col md={1}>
                    <h4>{item.qty}</h4>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => deleteFromCart(item)}
                      size='sm'
                      variant='danger'
                    >
                      <FaTrash size={20} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup variant='flush' className='bg-white p-4 rounded shadow'>
          <ListGroup.Item className='text-center'>
            <h2>Checkout</h2>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <span>Username</span>
            <span>{user?.username}</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <span>Address</span>
            <span>{shippingAddress?.address}</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <span>Country</span>
            <span>{shippingAddress?.country}</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <span>Tax </span>
            <span>{formatCurrencry(taxPrice)}</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <span>Shipping </span>
            <span>{formatCurrencry(shippingPrice)}</span>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <h6>Total Price</h6>
            <h6>{formatCurrencry(totalPrice)}</h6>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <Button
              disabled={cartItems.length === 0}
              onClick={createOrderHandler}
              className='w-full bg-green-500 btn-outline-white'
            >
              Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default PlaceOrder;
