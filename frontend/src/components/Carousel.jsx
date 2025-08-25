import Carousel from 'react-bootstrap/Carousel';
import IndexInfoComponent from './IndexInfoComponent';


function MarketViewCarousel({chartsData}) {
  return (
    <>
       
        
        <Carousel>
        
            {chartsData.map((item, index) => (
                <Carousel.Item key={index}> {/* or use item.id if available */}
                    <IndexInfoComponent indexData={item} />
                </Carousel.Item>))
            }
        </Carousel>
    </>
    
  );
}

export default MarketViewCarousel;