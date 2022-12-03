import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../../lib/api/products';
import { setError } from '../../../../utils/error';
import { formatCurrencry, formatDate } from '../../../../utils/formater';
import { customToast } from '../../../../utils/toast';
import { ProductType } from '../../../../utils/types/product.type';

type Props = {
  product: ProductType;
};

const ProductTable = ({ product }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteProductMutaion = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // refetch
      queryClient.invalidateQueries({ queryKey: ['ProductsFilter'] });
      toast.success('Product has been deleted');
    },
    onError(error, variables, context) {
      customToast('error', setError(error));
    },
  });

  const deleteHandler = () => {
    if (window.confirm('are you sure?')) {
      deleteProductMutaion.mutate(product.id);
    }
  };

  return (
    <tr>
      <td className='d-flex gap-8' scope='col'>
        <Image roundedCircle src={product.image} className='w-10 h-10' />
        <strong>{product.name}</strong>
      </td>
      <td>{product.category}</td>
      <td>{formatCurrencry(product.price)}</td>
      <td>{formatDate(product?.createdAt)}</td>
      <td className=''>
        <Button
          onClick={() => navigate(`/dashboard/product-edit/${product.id}`)}
          size='sm'
          className='me-2'
        >
          <FaEdit />
        </Button>
        <Button onClick={deleteHandler} size='sm' variant='danger'>
          <FaTrash />
        </Button>
      </td>
    </tr>
  );
};

export default ProductTable;
