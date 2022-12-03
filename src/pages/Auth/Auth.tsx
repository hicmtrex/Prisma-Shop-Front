import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <Row className=' justify-content-center'>
      <Col md={7} className=''>
        <Card className='shadow '>
          <Card.Body>
            <Tabs
              defaultActiveKey='home'
              id='fill-tab-example'
              className='mb-3'
              fill
            >
              <Tab eventKey='home' title={<h4>Signin</h4>}>
                <Login />
              </Tab>

              <Tab eventKey='longer-tab' title={<h4>Signup</h4>}>
                <Register />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Auth;
