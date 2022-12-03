import { ChangeEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { LoaderIcon } from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import TableContainer from '../../../components/Containers/TableContainer';
import useDebounce from '../../../hooks/useDebounce';
import useSearchQuery from '../../../hooks/useSearchQuery';
import { ProductType } from '../../../utils/types/product.type';
import ProductModal from '../components/Modals/ProductModal';
import ProductTable from '../components/Tables/ProductTable';

const ProductsList = () => {
  const theadData = ['Product', 'Category', 'Price', 'Created At', 'Options'];
  const [name, setName] = useState('');
  const [debounce] = useDebounce(name, 500);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, isLoading } = useSearchQuery(
    debounce,
    'products',
    'ProductsFilter'
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <TableContainer
      button={
        <Button onClick={handleShow} className='' size='sm'>
          <FaPlus /> <span>Product</span>
        </Button>
      }
      title='Product List'
      theadData={theadData}
      onChange={onChange}
    >
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <>
          {data?.products?.map((product: ProductType) => (
            <ProductTable key={product.id} product={product} />
          ))}
        </>
      )}
      <ProductModal show={show} handleClose={handleClose} />
    </TableContainer>
  );
};

export default ProductsList;
