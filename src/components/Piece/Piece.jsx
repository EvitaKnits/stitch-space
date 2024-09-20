import { Fragment } from 'react';
import { Badge, Card, Carousel, Image } from 'react-bootstrap';
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
    constructor({
        id = 0,
        title = "Example Title",
        imageUrl = "./src/assets/examplecarouselimage.jpg",
        userId = 0,
        userName = "Example User",
        artType = "Embroidery",
        rating = 2,
    }) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.userName = userName;
        this.artType = artType;
        this.rating = rating;
        this.caption = `"${title}" by ${userName} (${artType})`;
    }

    static fromJSON(value) {
        return new Piece({
            id: value.id,
            title: value.title,
            imageUrl: value.image,
            userId: value.userId,
            userName: value.userName,
            artType: value.artType,
            rating: value.rating,
        });
    }
}
