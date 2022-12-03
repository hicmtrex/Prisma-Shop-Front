import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import { getProducts } from '../lib/api/products';
import Loading from '../components/Loading';
import ProductCard from './Main/components/ProductCard';

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <Loading />;
  } else
    return (
      <Row className='courses'>
        <h2 className='my-3'>Latest Products</h2>
        {data?.products.slice(0, 6).map((product) => (
          <Col
            md={4}
            key={product.id}
            className='d-flex align-items-stretch mt-4 mt-md-0'
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
};

export default HomePage;
