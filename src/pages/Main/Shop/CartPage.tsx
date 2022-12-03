import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../../../components/UI/Message';
import useCartStore from '../../../store/useCart';
import { ProductType } from '../../../utils/types/product.type';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCartStore(
    (state) => state
  );

  const totalPrice = cartItems.reduce<any>(
    (accumulator: any, currentValue: ProductType) =>
      accumulator + currentValue.price * currentValue.qty,
    0
  ) as any;

  return (
    <Row>
      <Col md={8}>
        {!cartItems.length ? (
          <Message variant='danger'>
            No Items in The Basket{' '}
            <Link className='ms-1' to='/'>
              Go Shop
            </Link>
          </Message>
        ) : (
          <ListGroup variant='fuish' className='bg-white shadow'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className='align-items-center justify-content-center'>
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
                  <Col md={3}>
                    <FaPlusCircle
                      id='button__icon'
                      className='cursor-pointer text-green-500 me-2'
                      onClick={() => addToCart(item)}
                      size={25}
                    />

                    <FaMinusCircle
                      id='button__icon'
                      className='cursor-pointer text-green-500'
                      size={25}
                      onClick={() => removeFromCart(item)}
                    />
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
            <h6>Toal Price</h6>
            <h6>${totalPrice}</h6>
          </ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between align-items-center'>
            <Button
              onClick={() => navigate('/address')}
              disabled={cartItems.length === 0}
              // onClick={createOrder}
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

export default CartPage;
