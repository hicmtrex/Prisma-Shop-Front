import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuth';

const ProtectedRoutes = () => {
  const { token } = useAuthStore((state) => state);

  if (token) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navigate to={'/auth'} />;
      </>
    );
  }
};

export default ProtectedRoutes;
