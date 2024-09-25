import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FollowerCard = ({ id, fullName, imageUrl }) => {
    return (
        <Card className="mb-3">
            <Card.Body className="d-flex align-items-center">
                <Image
                    src={imageUrl}
                    roundedCircle
                    width={50}
                    height={50}
                    className="me-3"
                />
                <div>
                    <Card.Title className="mb-0">
                        <Link to={`/profile/${id}`}>{fullName}</Link>
                    </Card.Title>
                </div>
            </Card.Body>
        </Card>
    );
};
export default FollowerCard;

// Follower Model Class: Maps the data from JSON to the model
export class Follower {
    constructor({
        id = 0,
        followerProfile: {
            id: profileId = 0,
            firstName = "Alice",
            lastName = "Alison",
            image = null,
        } = {},  // Default to an empty object in case followerProfile is not provided
        createdAt = "2024-09-20T11:24:08.958484Z",
    }) {
        this.id = id; // Follower ID
        this.profileId = profileId; // Profile ID of the follower
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = image;
        this.fullName = `${firstName} ${lastName}`;
        this.createdAt = createdAt;
    }

    static fromJSON(value) {
        return new Follower({
            id: value.id,
            followerProfile: {
                id: value.followerProfile?.id,
                firstName: value.followerProfile?.firstName,
                lastName: value.followerProfile?.lastName,
                image: value.followerProfile?.image,
            },
            createdAt: value.createdAt,
        });
    }
}
