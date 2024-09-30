import { useState } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import styles from './FeaturedArtists.module.css'
import { PieceCard } from '../Piece/Piece'
import usePiecesList from '../../hooks/usePiecesList'


const FeaturedArtists = () => {
    const [index, setIndex] = useState(0)
    const { pieces, loading } = usePiecesList({
        featured: true,
    })


    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    if (loading) return '';

    return (
        <Carousel
            className={styles.Carousel + 'p-2'}
            activeIndex={index}
            onSelect={handleSelect}
            indicators={false}
        >
            {pieces.map((value) => (
                <CarouselItem key={value.id} >
                    <PieceCard {...value} />
                </CarouselItem>
            ))}
        </Carousel>
    )
}

export default FeaturedArtists
