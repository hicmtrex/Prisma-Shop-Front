import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../../components/UI/Loader';
import useAuthStore from '../../store/useAuth';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const DashboardLayout = () => {
  const { refreshToken, user, token } = useAuthStore((state) => state);
  const { isLoading } = useQuery({ queryKey: ['auth'], queryFn: refreshToken });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user?.role !== 'admin') {
        navigate(-1);
      }
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='d-flex flex-column flex-lg-row bg-surface-secondary'>
          <Sidebar />
          <div style={{ minHeight: '100vh' }} className=' flex-grow-1 '>
            <Topbar />

            <main className=' bg-surface-secondary'>
              <Container fluid>
                <Outlet />
              </Container>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
