import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { getProductById } from '../../../lib/api/products';
import useCartStore from '../../../store/useCart';
import { formatCurrencry } from '../../../utils/formater';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useQuery({
    queryKey: ['Product', id],
    queryFn: () => getProductById(id),
  });
  const { addToCart } = useCartStore((state) => state);

  const add = () => {
    if (!product) return;
    addToCart(product);
    navigate('/cart');
  };
  return (
    <>
      {isLoading || !product ? (
        <Loading />
      ) : (
        <Row className='my-6'>
          <Col md={8}>
            <Image src={product?.image} style={{ height: '500px' }} />
          </Col>
          <Col md={4}>
            <ListGroup variant=' flush' className='shadow bg-white rounded p-2'>
              <ListGroupItem>
                <h3>{product?.name}</h3>
              </ListGroupItem>
              <ListGroupItem className=' d-flex justify-content-between align-items-center'>
                <h6>Category</h6>
                <h6>{product?.category}</h6>
              </ListGroupItem>
              <ListGroupItem className=' d-flex justify-content-between align-items-center'>
                <h6>Brand</h6>
                <h6>{product?.category}</h6>
              </ListGroupItem>
              <ListGroupItem className=' d-flex justify-content-between align-items-center'>
                <h6>Price</h6>
                <h6>{formatCurrencry(product?.price)}</h6>
              </ListGroupItem>
              <ListGroupItem>{product?.description}</ListGroupItem>
              <ListGroupItem>
                <Button
                  onClick={add}
                  variant='white'
                  className='w-full gap-2 bg-green-500 text-white'
                >
                  <span>Add To Cart</span> <FaShoppingCart />
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetails;
