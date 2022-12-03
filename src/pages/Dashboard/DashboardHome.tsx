import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const DashboardHome = () => {
  return (
    <Row className='g-6 mb-6'>
      <Col md={4}>
        <Card className=' shadow border-0'>
          <Card.Body>
            <Row>
              <Col>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                  Entriprise
                </span>
                <span className='h3 font-bold mb-0'>$750.90</span>
              </Col>
              <div className='col-auto'>
                <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                  <i className='bi bi-credit-card' />
                </div>
              </div>
            </Row>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1' />
                13%
              </span>
              <span className='text-nowrap text-xs text-muted'>
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className=' shadow border-0'>
          <Card.Body>
            <Row>
              <Col>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                  Clients
                </span>
                <span className='h3 font-bold mb-0'>215</span>
              </Col>
              <div className='col-auto'>
                <div className='icon icon-shape bg-primary text-white text-lg rounded-circle'>
                  <i className='bi bi-people' />
                </div>
              </div>
            </Row>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1' />
                30%
              </span>
              <span className='text-nowrap text-xs text-muted'>
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className=' shadow border-0'>
          <Card.Body>
            <Row>
              <Col>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>
                  Offres
                </span>
                <span className='h3 font-bold mb-0'>1.400</span>
              </Col>
              <div className='col-auto'>
                <div className='icon icon-shape bg-info text-white text-lg rounded-circle'>
                  <i className='bi bi-clock-history' />
                </div>
              </div>
            </Row>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-danger text-danger me-2'>
                <i className='bi bi-arrow-down me-1' />
                -5%
              </span>
              <span className='text-nowrap text-xs text-muted'>
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardHome;
