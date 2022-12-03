import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Navbar';
import useAuthStore from '../../store/useAuth';
import Brands from './components/Brands';
import Carousels from './components/Carousels';
import DownFooter from './components/Footer/DownFooter';
import Footer from './components/Footer/Footer';

const MainLayout = () => {
  const location = useLocation();
  const { refreshToken, user, token } = useAuthStore((state) => state);
  const isHome = location.pathname === '/';

  const { isLoading } = useQuery({ queryKey: ['auth'], queryFn: refreshToken });

  //if (isLoading) return <Loading />;

  return (
    <Fragment>
      <Header />
      {isHome ? <Carousels /> : null}
      <Container>
        <main className='main py-3'>
          <Outlet />
        </main>
      </Container>

      {isHome ? <Brands /> : null}
      <footer id='footer'>
        {isHome ? <DownFooter /> : null}
        <Footer />
      </footer>
    </Fragment>
  );
};

export default MainLayout;
