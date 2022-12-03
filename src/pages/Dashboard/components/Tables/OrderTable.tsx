import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import toast, { CheckmarkIcon, ErrorIcon } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../../lib/api/products';
import { setError } from '../../../../utils/error';
import { formatCurrencry, formatDate } from '../../../../utils/formater';
import { customToast } from '../../../../utils/toast';
import { AdminOrderType, OrderType } from '../../../../utils/types/order.type';
import { ProductType } from '../../../../utils/types/product.type';

type Props = {
  order: AdminOrderType;
};

const OrderTable = ({ order }: Props) => {
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
      deleteProductMutaion.mutate(order.id);
    }
  };

  return (
    <tr>
      <td className='d-flex gap-1 overflow-auto' scope='col'>
        {order.cartItems.map((item) => (
          <Image
            roundedCircle
            key={item.id}
            src={item.image}
            className='w-10 h-10'
          />
        ))}
      </td>
      <td>{order.user.email}</td>
      <td>{formatCurrencry(order.totalPrice)}</td>
      <td>{order.shippingAddress.address}</td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{order.isPaid ? <CheckmarkIcon /> : <ErrorIcon />}</td>
    </tr>
  );
};

export default OrderTable;
