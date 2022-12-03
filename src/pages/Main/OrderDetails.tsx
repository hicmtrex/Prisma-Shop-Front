import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderBydId, orderPayment } from '../../lib/api/orders';
import {
  formatCurrencry,
  formatDate,
  getItemsPrice,
} from '../../utils/formater';
import Stripe from 'react-stripe-checkout';
import { customToast } from '../../utils/toast';
import { setError } from '../../utils/error';
import authApi from '../../lib/api/auth-api';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: order, isLoading } = useQuery({
    queryKey: ['OrderDetails'],
    queryFn: () => getOrderBydId(id),
  });

  // const handlePaymentMutation = useMutation({
  //   mutationFn: orderPayment,
  //   onError(error) {
  //     customToast('error', setError(error));
  //   },
  //   onSuccess() {
  //     authApi
  //       .put(`/orders/${order?.id}`,{ isPaid: true })
  //       .then(() => {
  //         queryClient.invalidateQueries({ queryKey: ['OrderDetails'] });
  //         toast.success('you have been payment successfully');
  //       })
  //       .catch((err) => customToast('error', setError(err)));
  //   },
  // });

  const handlePayment = (token: any) => {
    authApi
      .post('/orders/stripe', {
        token: token.id,
        amount: order?.totalPrice,
      })
      .then(() => {
        authApi.put(`/orders/${order?.id}`, { isPaid: true }).then(() => {
          toast.success('you have been paid successfully🙂');
          queryClient.invalidateQueries({ queryKey: ['OrderDetails'] });
          navigate('/');
        });
      })
      .catch((error) => customToast('error', setError(error)));
  };

  const tokenHandler = (token: any) => {
    handlePayment(token);
    //const payment = { id: token.id, amount: order?.totalPrice };
    // handlePaymentMutation.mutate(payment);
  };

  return (
    <Container className=' py-5 h-100'>
      {isLoading || !order ? (
        <LoaderIcon />
      ) : (
        <Row className='d-flex justify-content-center align-items-center h-100'>
          <Col lg={10} xl={8}>
            <Card>
              <Card.Header className=' px-4 py-5'>
                <h5 className='text-muted mb-0'>
                  Thanks for your Order,{' '}
                  <span className='text-primary'>{order?.user?.username}</span>!
                </h5>
              </Card.Header>
              <Card.Body className='p-4'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                  <p
                    className='lead fw-normal mb-0'
                    style={{ color: '#a8729a' }}
                  >
                    Receipt
                  </p>
                  <p className='small text-muted mb-0'>Order Id : {order.id}</p>
                </div>
                {order?.cartItems.map((item) => (
                  <Card className='shadow-0 border mb-4' key={item.id}>
                    <Card.Body>
                      <Row>
                        <Col md={2}>
                          <Image fluid src={item.image} alt='Phone' />
                        </Col>
                        <Col
                          md={4}
                          className='text-center d-flex justify-content-center align-items-center'
                        >
                          <p className='text-muted mb-0'>{item.name}</p>
                        </Col>

                        <div className='col-md-2 text-center d-flex justify-content-center align-items-center'>
                          <p className='text-muted mb-0 small'>
                            {item.category}
                          </p>
                        </div>
                        <div className='col-md-2 text-center d-flex justify-content-center align-items-center'>
                          <p className='text-muted mb-0 small'>
                            Qty: {item.qty}
                          </p>
                        </div>
                        <div className='col-md-2 text-center d-flex justify-content-center align-items-center'>
                          <p className='text-muted mb-0 small'>
                            {formatCurrencry(item.price)}
                          </p>
                        </div>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
                <div className='d-flex justify-content-between pt-2'>
                  <p className='fw-bold mb-0'>Order Details</p>
                  <p className='text-muted mb-0'>
                    <span className='fw-bold me-4'>Total</span>{' '}
                    {formatCurrencry(getItemsPrice(order.cartItems))}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='text-muted mb-0'>
                    Invoice Date : {formatDate(order.createdAt)}
                  </p>
                  <p className='text-muted mb-0'>
                    <span className='fw-bold me-4'>GST 18%</span> 123
                  </p>
                </div>
                <div className='d-flex justify-content-between mb-5'>
                  <p className='text-muted mb-0'>
                    Recepits Voucher : 18KU-62IIK
                  </p>
                  <p className='text-muted mb-0'>
                    <span className='fw-bold me-4'>Delivery Charges</span> Free
                  </p>
                </div>
              </Card.Body>
              <Card.Footer className=' border-0 px-4 py-5 bg-primary'>
                <h5 className='d-flex align-items-center justify-content-between text-white text-uppercase mb-0'>
                  <p className='h3 text-white'>
                    <span> Total : </span>
                    <span className='me-2'>
                      {formatCurrencry(order.totalPrice)}
                    </span>
                  </p>
                  {order.isPaid ? null : (
                    <Stripe
                      currency='USD'
                      description={`Total Price ${formatCurrencry(
                        order.totalPrice
                      )}`}
                      image='/Prisma-Emblema.png'
                      stripeKey={import.meta.env.VITE_API_STRIPE}
                      name='Shopping-Online'
                      token={tokenHandler}
                    />
                  )}
                </h5>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderDetails;
