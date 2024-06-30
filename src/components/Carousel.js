// Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box } from '@mui/material';
import { urlFor } from '../sanityClient';
import './Carousel.scss';

const CarouselComponent = ({ images }) => (
    <Box sx={{ my: 4 }}>
        <Carousel showThumbs={false} autoPlay infiniteLoop className="carousel-container">
            {images.map((image, index) => (
                <div key={index}>
                    <img src={urlFor(image)} alt={image.alt} />
                </div>
            ))}
        </Carousel>
    </Box>
);

export default CarouselComponent;
