import { useState } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'

import Piece, { PieceCarouselItem } from '../Piece/Piece'
import styles from './FeaturedArtists.module.css'

const featuredPieces = []

// Development-only Code Start

featuredPieces.push(
    new Piece({ id: 1, userName: 'Jeff', title: 'Has all the money' })
)
featuredPieces.push(new Piece({ id: 2, userName: 'Mark', title: 'Marky Mark' }))
featuredPieces.push(new Piece({ id: 3, userName: 'Tim', title: 'Tam' }))

// Development-only Code End

const FeaturedArtists = () => {
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    return (
        <Carousel
            className={styles.Carousel}
            activeIndex={index}
            onSelect={handleSelect}
        >
            {featuredPieces.map((value) => (
                <CarouselItem key={value.id}>
                    <PieceCarouselItem {...value} />
                </CarouselItem>
            ))}
        </Carousel>
    )
}

export default FeaturedArtists
