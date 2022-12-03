import { useQuery } from '@tanstack/react-query';
import { Alert, Row } from 'react-bootstrap';
import { LoaderIcon } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../lib/api/user';
import { setError } from '../../../utils/error';
import OrderHistory from './OrderHistory';
import UserInfo from './UserInfo';

const UserProfile = () => {
  const { id } = useParams();

  const {
    data: user,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['UserDetails', id],
    queryFn: () => getUserById(id),
  });

  let content;

  if (isLoading) {
    content = <LoaderIcon />;
  } else if (isError) {
    content = <Alert variant='danger'>{setError(error)}</Alert>;
  } else {
    content = (
      <Row>
        <UserInfo user={user} />
        <OrderHistory orders={user.Order} />
      </Row>
    );
  }

  return content;
};

export default UserProfile;
