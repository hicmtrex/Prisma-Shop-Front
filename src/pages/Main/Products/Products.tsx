import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import Loader from '../../../components/UI/Loader';
import Message from '../../../components/UI/Message';
import useDebounce from '../../../hooks/useDebounce';
import { filterProducts } from '../../../lib/api/products';
import { setError } from '../../../utils/error';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [debounce] = useDebounce(name, 500);

  const filter = { name: debounce, brand, category };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['ProductsFilter', filter],
    queryFn: () => filterProducts(filter),
  });

  if (isLoading) {
    return (
      <Row>
        <Loader />
      </Row>
    );
  } else if (isError) {
    return (
      <Row>
        <Message variant='danger'>{setError(error)}</Message>
      </Row>
    );
  } else
    return (
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body className='text-lg font-bold'>
              <h4>Filter By Category</h4>
              <Form.Check
                id='all category'
                value={''}
                onChange={() => setCategory('')}
                className='my-2'
                name='filters'
                type='radio'
                label='All '
              />
              {data?.categories.map((c) => (
                <Form.Check
                  id={c}
                  key={c}
                  value={c}
                  onChange={(e) => setCategory(e.target.value)}
                  className='my-2'
                  name='filters'
                  type='radio'
                  label={c}
                />
              ))}
              <hr />
              <h4>Filter By Brand</h4>
              <Form.Check
                id={'all brands'}
                value={''}
                onChange={() => setBrand('')}
                className='my-2 cursor-pointer'
                name='brands'
                type='radio'
                label='All'
              />
              {data?.brands.map((b) => (
                <Form.Check
                  id={b}
                  key={b}
                  value={b}
                  onChange={(e) => setBrand(e.target.value)}
                  className='my-2'
                  name='brands'
                  type='radio'
                  label={b}
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Form.Control
            placeholder='search'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Row className='courses'>
            {data?.products.map((product) => (
              <Col md={4} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
};

export default Products;
