import About from '../../components/About/About';
import FeaturedArtists from '../../components/ExampleCarouselImage/ExampleCarouselImage';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <About />
            <h2>Featured Artists</h2>
            <FeaturedArtists />
        </Fragment>
    );
};

export default Home;