import {
  Stack,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../store/useAuth';
import useCartStore from '../store/useCart';

const Header = () => {
  const { user, userLogout } = useAuthStore((state) => state);
  const { cartItems, resetCart } = useCartStore((state) => state);

  const onLogout = () => {
    userLogout();
    resetCart();
  };
  return (
    <Navbar
      fixed='top'
      collapseOnSelect
      sticky='top'
      variant='light'
      bg='light'
      expand='lg'
      className='px-0 py-3 shadow sticky-md-top'
    >
      <div className='container-xl'>
        <Navbar.Brand as={NavLink} to='/'>
          <Image
            src='/images/Prisma-Logo.jpg'
            className=' w-18 h-10'
            alt='...'
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-na'>
          <div className='navbar-nav mx-lg-auto'>
            <Nav.Item as={NavLink} className=' nav-link active' to='/'>
              Home
            </Nav.Item>
            <Nav.Item as={NavLink} className='nav-link' to='/products'>
              Products
            </Nav.Item>
            <a className='nav-item nav-link' href='#'>
              Features
            </a>
            <Nav.Item as={NavLink} className='nav-link' to='/about'>
              About
            </Nav.Item>
          </div>
          {user ? (
            <Stack
              direction='horizontal'
              gap={5}
              className='d-flex align-items-center'
            >
              <Link to='/cart' className=' '>
                <Button
                  size='sm'
                  className='d-flex justify-content-between align-items-center w-18 bg-green-500 btn-outline-white '
                >
                  <span className='text-lg'>{cartItems.length}</span>
                  <FaShoppingCart size={20} />
                </Button>
              </Link>
              <NavDropdown
                title={user.username.toUpperCase()}
                id={user.username}
              >
                {user.role === 'admin' ? (
                  <NavDropdown.Item
                    as={NavLink}
                    to='/dashboard'
                    className=' bg-gray-200-hover duration-200'
                  >
                    Dashboard
                  </NavDropdown.Item>
                ) : null}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  as={NavLink}
                  to={`/profile/${user.id}`}
                  className=' bg-gray-200-hover duration-200'
                >
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className=' bg-gray-200-hover duration-200'
                  onClick={onLogout}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Stack>
          ) : (
            <>
              <div className='navbar-nav ms-lg-4'>
                <Nav.Item as={NavLink} className='nav-link' to='/auth'>
                  Sign in
                </Nav.Item>
              </div>

              <div className='d-flex align-items-lg-center mt-3 mt-lg-0'>
                <NavLink
                  to='/auth'
                  className='btn btn-sm btn-primary w-full w-lg-auto'
                >
                  Register
                </NavLink>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
