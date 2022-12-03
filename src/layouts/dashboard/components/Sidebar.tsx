import { Nav, Container, Navbar, Button, Image } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { HiUsers } from 'react-icons/hi';
import useAuthStore from '../../../store/useAuth';

const Sidebar = () => {
  const { user, userLogout } = useAuthStore((state) => state);
  return (
    <Navbar
      expand='lg'
      style={{ backgroundColor: 'rgba(22, 34, 57, 0.95)' }}
      variant='dark'
      className=' show navbar-vertical  px-0 py-3  border-bottom border-bottom-lg-0 '
      id='navbarVertical'
    >
      <Container fluid>
        <Button
          className='navbar-toggler ms-n2'
          data-bs-toggle='collapse'
          data-bs-target='#sidebarCollapse'
          aria-controls='sidebarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </Button>
        <Link
          className='navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0 d-flex align-items-center'
          to='/'
        >
          <Image
            src='/images/Prisma-Logo.jpg'
            fluid
            className=' w-32 rounded'
          />
        </Link>
        <div className='navbar-user d-lg-none'>
          <div className='dropdown'>
            <Link
              to='#'
              id='sidebarAvatar'
              role='button'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <div className='avatar-parent-child'>
                <Image
                  alt='Image Placeholder'
                  src='https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80'
                  className='avatar avatar- rounded-circle'
                />
                <span className='avatar-child avatar-badge bg-success' />
              </div>
            </Link>{' '}
            <div
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='sidebarAvatar'
            >
              <Link to='/' className='dropdown-item'>
                Profile
              </Link>
              <Link to='#' className='dropdown-item'>
                Paramètres
              </Link>
              <Link to='#' className='dropdown-item'>
                Facturation
              </Link>
              <hr className='dropdown-divider' />{' '}
              <button className='dropdown-item'>Se déconnecter</button>
            </div>
          </div>
        </div>
        <div className='collapse navbar-collapse' id='sidebarCollapse'>
          <ul className='navbar-nav'>
            <>
              <li className='nav-item '>
                <Link className='nav-link p-5' to='/dashboard/product-list'>
                  <HiUsers className='me-2' size={'1.5rem'} /> Products List
                </Link>
              </li>

              <li className='nav-item '>
                <Link className='nav-link p-5' to='/dashboard/order-list'>
                  <HiUsers className='me-2' size={'1.5rem'} /> Orders List
                </Link>
              </li>
              <li className='nav-item '>
                <Link className='nav-link p-5' to='/dashboard/user-list'>
                  <HiUsers className='me-2' size={'1.5rem'} /> Users List
                </Link>
              </li>
            </>
          </ul>

          <hr className='navbar-divider my-5 opacity-20' />

          <div className='' />
          <ul className='navbar-nav'>
            <Nav.Item
              className='nav-link'
              as={NavLink}
              to={`/profile/${user?.id}`}
            >
              <i className='bi bi-person-square' /> Mon Compte
            </Nav.Item>

            <Nav.Item className='nav-link cursor-pointer' onClick={userLogout}>
              <i className='bi bi-person-square' /> Logout
            </Nav.Item>
          </ul>
        </div>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
