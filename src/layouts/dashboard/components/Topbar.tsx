import { Container, Navbar } from 'react-bootstrap';

const Topbar = () => {
  return (
    <header
      className='border-bottom pt-6 text-white'
      style={{ backgroundColor: 'rgba(22, 34, 57, 0.95)' }}
    >
      <Container fluid>
        <div className='mb-npx h-16'>
          <div className='row align-items-center text-white'>
            <div className='col-sm-6 col-12 mb-4 mb-sm-0 text-white'>
              <h1 className='mb-2 text-white'>
                <Navbar.Brand href='#home'></Navbar.Brand>
              </h1>
            </div>
            <div className='col-sm-6 col-12 text-sm-end text-xl'>
              Espace Admin
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Topbar;
