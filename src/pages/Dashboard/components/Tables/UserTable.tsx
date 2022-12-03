import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../../../lib/api/products';
import { deleteUser } from '../../../../lib/api/user';
import { setError } from '../../../../utils/error';
import { formatCurrencry, formatDate } from '../../../../utils/formater';
import { customToast } from '../../../../utils/toast';
import { ProductType } from '../../../../utils/types/product.type';
import { UserFullInfo } from '../../../../utils/types/user.type';

type Props = {
  user: UserFullInfo;
};

const UserTable = ({ user }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteUserMutaion = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // refetch
      queryClient.invalidateQueries({ queryKey: ['UsersFilter'] });
      toast.success('User has been deleted');
    },
    onError(error) {
      customToast('error', setError(error));
    },
  });

  const deleteHandler = () => {
    if (window.confirm('are you sure?')) {
      deleteUserMutaion.mutate(user.id);
    }
  };

  return (
    <tr>
      <td>{user?.username}</td>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>{formatDate(user?.createdAt)}</td>
      <td className=''>
        <Button
          onClick={() => navigate(`/dashboard/user-edit/${user.id}`)}
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

export default UserTable;
