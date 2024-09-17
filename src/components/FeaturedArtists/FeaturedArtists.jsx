import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../ExampleCarouselImage/ExampleCarouselImage';
import styles from "./FeaturedArtists.module.css";

const FeaturedArtists = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel className={styles.Carousel} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <ExampleCarouselImage text="First slide" />
                <Carousel.Caption className={styles.CarouselCaption}>
                    <h3>James Robinson - Trees in Autumn - Embroidery</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage text="Second slide" />
                <Carousel.Caption className={styles.CarouselCaption}>
                    <h3>Second slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <ExampleCarouselImage text="Third slide" />
                <Carousel.Caption className={styles.CarouselCaption}>
                    <h3>Third slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default FeaturedArtists;
