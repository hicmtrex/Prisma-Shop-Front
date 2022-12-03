import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoaderIcon } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import TableContainer from '../../../components/Containers/TableContainer';
import useDebounce from '../../../hooks/useDebounce';
import useSearchQuery from '../../../hooks/useSearchQuery';
import { getOrdersList } from '../../../lib/api/orders';
import { ProductType } from '../../../utils/types/product.type';
import ProductModal from '../components/Modals/ProductModal';
import OrderTable from '../components/Tables/OrderTable';
import ProductTable from '../components/Tables/ProductTable';

const OrdersList = () => {
  const theadData = [
    'Products',
    'Email',
    'Total Price',
    'Address',
    'Created At',
    'Is Paid',
  ];
  const [name, setName] = useState('');
  const [debounce] = useDebounce(name, 500);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['Orders'],
    queryFn: getOrdersList,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <TableContainer
      showSearch={false}
      button={null}
      title='Orders List'
      theadData={theadData}
      onChange={onChange}
    >
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <>
          {orders?.map((order) => (
            <OrderTable key={order.id} order={order} />
          ))}
        </>
      )}
      <ProductModal show={show} handleClose={handleClose} />
    </TableContainer>
  );
};

export default OrdersList;
