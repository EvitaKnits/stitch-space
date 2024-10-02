import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Masonry } from 'masonic'
import { Badge, Button, Card, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Basic view of an individual piece
export const PieceCard = ({
    id,
    title,
    image,
    profileId,
    firstName,
    lastName,
    artType,
    caption,
    hideUserName,
}) => {
    return (
        <Card>
            <a href={`/profile/${profileId}/piece/${id}`}>
                <Card.Img variant="top" src={image} title={caption} />
            </a>
            <Card.Body>
                <Card.Title
                    style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                    }}
                >
                    {title}
                </Card.Title>
                {!hideUserName && (
                    <Card.Text>{`${firstName} ${lastName}`}</Card.Text>
                )}
                <Badge bg="secondary">{artType}</Badge>
            </Card.Body>
        </Card>
    )
}

export const MasonryWall = ({
    pieces,
    pagination,
    handleNextPage,
    handlePrevPage,
}) => {
    // 'Masonic' library handles the tiling of the Piece components
    return (
        <>
            <Masonry
                items={pieces}
                render={MasonryTile}
                columnGutter={5}
                className="p-5"
            />
            <Stack direction="horizontal" gap={3}>
                {pagination.previousPage && (
                    <Button className="" onClick={handlePrevPage}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Previous page
                    </Button>
                )}
                {pagination.nextPage && (
                    <Button className="ms-auto" onClick={handleNextPage}>
                        Next page <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                )}
            </Stack>
        </>
    )
}

// Wrapper for the Masonic library to render the Piece cards
const MasonryTile = ({ data }) => {
    const navigate = useNavigate()

    if (data.isAddNewButton) {
        return (
            <Card className="text-center">
                <Card.Body className="d-flex align-items-center justify-content-center">
                    <Button
                        variant="primary"
                        onClick={() => {
                            navigate(`/profile/${data.profile}/piece/new`)
                        }}
                    >
                        Add a new piece
                    </Button>
                </Card.Body>
            </Card>
        )
    } else {
        return <PieceCard {...data} />
    }
}

// A structured class for a consistent object structure
export default class Piece {
    constructor({
        id = 0,
        title = 'Example Title',
        image = 'https://picsum.photos/200/300',
        profile = {},
        artType = 'Embroidery',
        rating = 2,
        userRating = {},
        createdAt = '2024-09-20T14:34:47.892221Z',
        updatedAt = '2024-09-25T19:24:50.511153Z',
    } = {}) {
        this.id = id
        this.title = title
        this.image = image

        const {
            id: profileId = 12,
            firstName = 'Example',
            lastName = 'User',
            email = 'example@user.com',
            biography = 'Example user bio',
            image: profileImage = 'https://picsum.photos/id/237/300',
            lastVisitedNotifications = null,
            createdAt: profileCreatedAt = '2024-09-25T20:57:43.381714Z',
            updatedAt: profileUpdatedAt = '2024-09-25T20:57:43.381724Z',
        } = profile

        this.profileId = profileId
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.biography = biography
        this.profileImage = profileImage
        this.lastVisitedNotifications = lastVisitedNotifications
        this.profileCreatedAt = profileCreatedAt
        this.profileUpdatedAt = profileUpdatedAt

        const { ratingId = null, score = 0 } = userRating || {}

        this.ratingId = ratingId
        this.score = score

        this.artType = artType
        this.rating = rating
        this.createdAt = createdAt
        this.updatedAt = updatedAt

        this.caption = `"${title}" by ${firstName} ${lastName} (${artType})`
    }

    // Helper function for mapping API responses to Piece objects
    static fromJSON(value) {
        return new Piece({
            id: value.id,
            title: value.title,
            image: value.image,
            profile: value.profile,
            artType: value.artType,
            rating: value.rating,
            userRating: value.userRating,
            createdAt: value.createdAt,
            updatedAt: value.updatedAt,
        })
    }
}
