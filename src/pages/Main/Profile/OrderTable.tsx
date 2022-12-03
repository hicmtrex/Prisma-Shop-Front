import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Image } from 'react-bootstrap';
import toast, { CheckmarkIcon, ErrorIcon } from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteOrder } from '../../../lib/api/orders';
import { setError } from '../../../utils/error';
import { formatCurrencry, formatDate } from '../../../utils/formater';
import { customToast } from '../../../utils/toast';
import { OrderType } from '../../../utils/types/order.type';

type Props = {
  order: OrderType;
};

const OrderTable = ({ order }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onError(error) {
      customToast('error', setError(error));
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['UserDetails'] });
      toast.success('Order has been cancled');
    },
  });

  const cancelOrder = () => {
    deleteOrderMutation.mutate(order.id);
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

      <td>{formatCurrencry(order.totalPrice)}</td>
      <td>{order.shippingAddress.address}</td>
      <td>{formatDate(order.createdAt)}</td>

      <td>{order.isPaid ? <CheckmarkIcon /> : <ErrorIcon />}</td>
      <td>
        {order.isPaid ? (
          <Button
            onClick={() => navigate(`/orders/${order.id}`)}
            size='sm'
            variant='success'
            className='me-2'
          >
            <FaEye size={20} /> View
          </Button>
        ) : (
          <>
            <Button
              onClick={() => navigate(`/orders/${order.id}`)}
              size='sm'
              variant='success'
              className='me-2'
            >
              Pay Now
            </Button>
            <Button onClick={cancelOrder} size='sm' variant='danger'>
              Cancel
            </Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default OrderTable;
