import { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Carousels = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className='carsouel__item'>
        <img
          //   style={{ height: '650px' }}
          className='d-block w-full '
          src='https://www.discoveringfinland.com/wp-content/uploads/2010/07/prisma1.png'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item'>
        <img
          //   style={{ height: '650px' }}
          className='d-block w-full '
          src='https://d7rh5s3nxmpy4.cloudfront.net/CMP1431/1/LHIL113BI19367_FIN_000002_Prisma_Shopping_Center_IMD.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item className='carsouel__item'>
        <img
          //   style={{ height: '650px' }}
          className='d-block w-full '
          src='https://www.graphicconcrete.com/templates/yootheme/cache/graphic_concrete_fi_prisma_imatra_shopping_center_01-d7fdcdaf.jpeg'
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
