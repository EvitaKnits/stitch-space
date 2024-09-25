import { Fragment } from 'react';
import { Badge, Card, Carousel, Image, Button } from 'react-bootstrap';
import { Masonry } from "masonic";
import styles from "./Piece.module.css";
import { useNavigate } from "react-router-dom";

const PieceCard = ({ id, title, imageUrl, userId, userName, artType, caption, hideUserName }) => {
    return (
        <Card>
            <a href={`/profile/${userId}/piece/${id}`}>
                <Card.Img variant="top" src={imageUrl} title={caption} /></a >
            <Card.Body>
                <Card.Title style={{ overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>{title}</Card.Title>
                {!hideUserName && <Card.Text>{userName}</Card.Text>}
                <Badge bg="secondary">{artType}</Badge>
            </Card.Body>
        </Card >

    );
};

export const MasonryWall = ({ pieces }) => {
    // 'Masonic' library handles the tiling of the Piece components
    return <Masonry items={pieces} render={MasonryTile} columnGutter={5} className="p-5" />
}

const MasonryTile = ({ data }) => {
    const navigate = useNavigate();

    if (data.isAddNewButton) {
        return (
            <Card className="text-center">
                <Card.Body className="d-flex align-items-center justify-content-center">
                    <Button
                        variant="primary"
                        onClick={() => {
                            navigate(`/profile/${data.userId}/pieces/new`);
                        }}
                    >
                        Add a new piece
                    </Button>
                </Card.Body>
            </Card>
        );
    } else {
        return <PieceCard {...data} />;
    }
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
