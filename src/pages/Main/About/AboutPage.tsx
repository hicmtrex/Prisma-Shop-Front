import { Col, Container, Image, Row } from 'react-bootstrap';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <main id='main'>
      {/* ======= Breadcrumbs ======= */}
      <div className='breadcrumbs' data-aos='fade-in'>
        <Container>
          <h2 className='text-white'>About Us</h2>
          <p>
            Est dolorum ut non facere possimus quibusdam eligendi voluptatem.
            Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis
            ipsam aperiam consequatur laboriosam nemo harum praesentium.{' '}
          </p>
        </Container>
      </div>
      {/* End Breadcrumbs */}
      {/* ======= About Section ======= */}
      <section id='about' className='about'>
        <Container data-aos='fade-up'>
          <Row>
            <Col
              lg={6}
              className='order-1 order-lg-2'
              data-aos='fade-left'
              data-aos-delay={100}
            >
              <Image
                fluid
                src='http://www.saint-petersburg.com/images/shopping/prisma-in-st-petersburg.jpg'
                alt='img'
              />
            </Col>
            <Col lg={6} className='pt-4 pt-lg-0 order-2 order-lg-1 content'>
              <h3>
                Voluptatem dignissimos provident quasi corporis voluptates sit
                assumenda.
              </h3>
              <p className='fst-italic'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <i className='bi bi-check-circle' /> Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </li>
                <li>
                  <i className='bi bi-check-circle' /> Duis aute irure dolor in
                  reprehenderit in voluptate velit.
                </li>
                <li>
                  <i className='bi bi-check-circle' /> Ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate trideta storacalaperda mastiro
                  dolore eu fugiat nulla pariatur.
                </li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section id='counts' className='counts section-bg'>
        <Container>
          <Row className='counters'>
            <Col lg={3} className='col-6 text-center'>
              <span className='purecounter'>260+</span>
              <p>Products</p>
            </Col>
            <Col lg={3} className='col-6 text-center'>
              <span className='purecounter'>122+</span>
              <p>Clients</p>
            </Col>
            <Col lg={3} className='col-6 text-center'>
              <span className='purecounter'>42</span>
              <p>Events</p>
            </Col>
            <Col lg={3} className='col-6 text-center'>
              <span className='purecounter'>15</span>
              <p>Trainers</p>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default AboutPage;
