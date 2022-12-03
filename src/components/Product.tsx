import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrencry } from '../utils/formater';
import { ProductType } from '../utils/types/product.type';

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  return (
    <Card className='m-3 shadow rounded'>
      <Link to={`/products/${product.id}`}>
        <Card.Img src={product.image} variant='top' className='h-64' />
        <Card.Body>
          <Card.Title className='d-flex justify-content-between align-items-center'>
            <h5>{product.name}</h5>
            <h5>{formatCurrencry(product.price)}</h5>
          </Card.Title>
          <Card.Text>{product.description.substring(0, 40)}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
