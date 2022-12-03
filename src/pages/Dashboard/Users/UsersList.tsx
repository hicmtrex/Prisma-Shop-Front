import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import TableContainer from '../../../components/Containers/TableContainer';
import Message from '../../../components/UI/Message';
import useDebounce from '../../../hooks/useDebounce';
import { getUsersList } from '../../../lib/api/user';
import { setError } from '../../../utils/error';
import { UserFullInfo } from '../../../utils/types/user.type';
import ProductModal from '../components/Modals/ProductModal';
import UserTable from '../components/Tables/UserTable';

const UsersList = () => {
  const theadData = ['Username', 'Email', 'Role', 'Created At', 'Options'];
  const [name, setName] = useState('');
  const [debounce] = useDebounce(name, 500);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['UsersFilter', debounce],
    queryFn: () => getUsersList(debounce),
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <TableContainer
      button={null}
      title='Users List'
      theadData={theadData}
      onChange={onChange}
    >
      {isError ? <Message variant='danger'>{setError(error)}</Message> : null}
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <>
          {users?.map((user: UserFullInfo) => (
            <UserTable key={user.id} user={user} />
          ))}
        </>
      )}
      <ProductModal show={show} handleClose={handleClose} />
    </TableContainer>
  );
};

export default UsersList;
