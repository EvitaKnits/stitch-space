import { Fragment } from 'react'

import About from '../../components/About/About'
import FeaturedArtists from '../../components/FeaturedArtists/FeaturedArtists'

const Home = () => {
    return (
        <Fragment>
            <About />
            <h2>Featured Artists</h2>
            <p>Check out our featured embroidery artists. These three pieces have
            been selected to showcase the incredible diversity, creativity, and
            craftsmanship found in contemporary embroidery. Each work highlights
            unique techniques and perspectives, demonstrating how this
            traditional art form continues to evolve and inspire.</p>
            {/* Carousel */}
            <FeaturedArtists />
        </Fragment>
    )
}

export default Home
