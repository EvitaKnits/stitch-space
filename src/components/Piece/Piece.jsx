import { Fragment } from 'react';
import { Badge, Card, Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import styles from "./Piece.module.css";

export const PieceCard = ({ id, title, imageUrl, userName, artType, caption }) => {
    return (
        <Card>
            <a href={`/pieces/${id}`}>
                <Card.Img variant="top" src={imageUrl} title={caption} /></a >
            <Card.Body>
                <Card.Title style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>{title}</Card.Title>
                <Card.Text>{userName}</Card.Text>
                <Badge bg="secondary">{artType}</Badge>
            </Card.Body>
        </Card >

    );
};

export const PieceCarouselItem = ({ id, title, imageUrl, userName, artType, caption }) => {
    return (
        <Fragment>
            <a href={`/pieces/${id}`}>
                <Image src={imageUrl} fluid text={caption} />
            </a>
            <Carousel.Caption className={styles.CarouselCaption}>
                <h3>{userName}- {title} - {artType}</h3>
            </Carousel.Caption>
        </Fragment>
    );
};

PieceCarouselItem.displayName = 'PieceCarouselItem';

export default class Piece {
    constructor({ id = 0, title = "Example Title that is roughly 75 characters long or there abouts. Maybe ish", imageUrl = "./src/assets/examplecarouselimage.jpg", userId = 0, userName = "Example User", artType = "Embroidery" }) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.userName = userName;
        this.artType = artType;
        this.caption = `"${title}" by ${userName} (${artType})`
    }
}

