import { Card, Col, Table } from 'react-bootstrap';
import { OrderType } from '../../../utils/types/order.type';
import OrderTable from './OrderTable';

type Props = {
  orders: OrderType[];
};

const OrderHistory = ({ orders }: Props) => {
  return (
    <Col md={8}>
      <Card className='my-6 bg-white'>
        <Card.Header className='d-flex flex-column flex-md-row align-items-center gap-6 justify-content-between w-full '>
          <h4 className='duration-300 text-blue-300-hover'>Order history</h4>
        </Card.Header>
        <Table responsive hover className='table-nowrap bg-white '>
          <thead
            style={{ backgroundColor: ' rgba(22, 34, 57, 0.95)' }}
            className='text-white thead-light'
          >
            <tr>
              <th scope='col'>Items</th>
              <th scope='col'>Total Price</th>
              <th scope='col'>Country</th>
              <th scope='col'>Created At</th>
              <th scope='col'>is Paid?</th>
              <th scope='col'>Method</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderTable order={order} />
            ))}
          </tbody>
        </Table>
      </Card>
    </Col>
  );
};

export default OrderHistory;
