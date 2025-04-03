import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


export default function Banner() {
  return (

    <div className="container-fluid p-0">
      <Carousel
        prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true"></span>}
        nextIcon={<span className="carousel-control-next-icon" aria-hidden="true"></span>}
      >
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src="/images/Banner.webp"
            alt="Fashion banner 1"
            style={{ width: "1300px", height: "412px", objectFit: "cover", objectPosition: "top center" }}
          />
          <Carousel.Caption>
            <h3>Trendy Fashion</h3>
            <p>Discover the latest trends in fashion</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="/images/Banner_1.webp"
            alt="Fashion banner 2"
            style={{ width: "1300px", height: "412px", objectFit: "cover", objectPosition: "top center" }}
          />
          <Carousel.Caption>
            <h3>Elegant Styles</h3>
            <p>Shop the most stylish outfits now</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="/images/Banner_2.webp"
            alt="Fashion banner 3"
            style={{ width: "1300px", height: "412px", objectFit: "cover", objectPosition: "top center" }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
