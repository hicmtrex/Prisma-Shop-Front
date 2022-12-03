import { ChangeEvent, ReactNode } from 'react';
import { Card, FormControl, Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

type Props = {
  title: string;
  button: any;
  children: ReactNode;
  theadData: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
};
const TableContainer = ({
  title,
  children,
  theadData,
  button,
  showSearch = true,
  onChange,
}: Props) => {
  return (
    <Card className='my-6 bg-white'>
      <Card.Header className='d-flex flex-column flex-md-row align-items-center gap-6 justify-content-between w-full '>
        <h4 className='duration-300 text-blue-300-hover'>{title}</h4>
        {showSearch ? (
          <div className='d-flex form-inputs align-items-center position-relative'>
            <FormControl
              onChange={onChange}
              className='w-md-96 w-75'
              type='text'
              placeholder='Search...'
            />
            <FaSearch
              className=''
              style={{
                position: 'absolute',
                right: '10px',
                top: '15px',
              }}
            />
          </div>
        ) : null}

        {button}
      </Card.Header>
      <Table responsive hover className='table-nowrap bg-white'>
        <thead
          style={{ backgroundColor: ' rgba(22, 34, 57, 0.95)' }}
          className='text-white thead-light'
        >
          <tr>
            {theadData.map((d) => (
              <th key={d} scope='col'>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </Card>
  );
};

export default TableContainer;
