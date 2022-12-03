import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatCurrencry } from '../../../utils/formater';
import { ProductType } from '../../../utils/types/product.type';

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card
      className='course-item m-3 shadow rounded-2 w-full'
      style={{ height: '480px' }}
    >
      <Link to={`/products/${product.id}`}>
        <Image src={product.image} fluid className='h-72' alt='img' />
        <div className='course-content'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <h4>{product.brand}</h4>
            <p className='price'>{formatCurrencry(product.price)}</p>
          </div>

          <h3>
            <a href='course-details.html'>{product.name}</a>
          </h3>
          <p>{product.description.substring(0, 50)}</p>
          <div className='trainer d-flex justify-content-between align-items-center'>
            <div className='trainer-profile d-flex align-items-center'>
              <span>{product.category}</span>
            </div>
            <div className='trainer-rank d-flex align-items-center'>
              <i className='bx bx-heart'></i>&nbsp;42
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
