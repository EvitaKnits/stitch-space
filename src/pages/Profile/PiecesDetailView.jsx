import { useState, useContext } from "react";
import { Button, Container, Image, Row, Col, FloatingLabel, Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Rating from "react-rating";
import useSelectedPiece from "../../hooks/useSelectedPiece";
import useSelectedProfile from "../../hooks/useSelectedProfile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PiecesEdit from "./PiecesEdit";
import { Link, useNavigate } from 'react-router-dom';
import Comment from '../../components/Comments/Comment'

const DetailView = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const {selectedProfile, loading} = useSelectedProfile();
    const pieceData = useSelectedPiece();

    const [comment, setComment] = useState('');
    const [editMode, setEditMode] = useState(false);

    // Mock data for comments
    const [comments, setComments] = useState([
        {
            id: 1,
            firstName: "Evita",
            lastName: "Orrock",
            text: "Amazing artwork!",
            date: "2023-10-01",
        },
        {
            id: 2,
            firstName: "Alice",
            lastName: "Wunderland",
            text: "Love the colors used.",
            date: "2023-10-02",
        },
    ]);

    const handleRating = (value) => {
        console.log(value);
    };
    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this piece?");
        if (!confirmDelete) return;

        try {
            // Placeholder for the API call to delete the piece
            console.log('Pretending to delete piece');

            // Simulate success response after deleting the piece
            alert('Piece deleted successfully');

            // Redirect user back to the profile or gallery after "deletion"
            navigate(`/profile/${selectedProfile}`);
        } catch (error) {
            // Handle errors gracefully
            console.error("Error deleting the piece (placeholder):", error);
            alert("Failed to delete the piece (placeholder). Please try again.");
        }
    };


    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleEditCancel = () => {
        setEditMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            id: comments.length + 1,
            username: currentUser.username || "Anonymous",
            text: comment,
            date: new Date().toISOString().split("T")[0],
        };
        setComments([...comments, newComment]);
        setComment("");
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    // Determine if current user is the owner of the piece
    const isOwner = currentUser && pieceData.piece && currentUser.pk === pieceData.piece.userId;

    if (!pieceData.loading && !loading && pieceData.piece.userId.toString() !== selectedProfile) {
        return <div>Not this person&apos;s artwork</div>;
    }

    if (pieceData.loading) {
        return '';
    }

    return (
        <>
            {editMode ? (
                // Render PiecesEdit component
                <PiecesEdit piece={pieceData.piece} onCancel={handleEditCancel} />
            ) : (
                <>
                    <Container>
                        <Row className="my-2">
                            <Col className="text-start">
                            <Button className="me-2" as={Link} to={`/profile/${selectedProfile}`}>Back to all art</Button>
                            {/* Edit and Delete Buttons visible to owner */}
                            {isOwner && (
                                    <>
                                        <Button onClick={handleEditClick} className="me-2">Edit Piece</Button>
                                        <Button variant="danger" onClick={handleDeleteClick}>Delete Piece</Button>
                                    </>
                            )}
                            </Col>
                        </Row>
                        <Row>
                            <Image src={pieceData.piece.image} className="w-auto mx-auto" style={{ maxHeight: '75vh' }} />
                        </Row>
                        <Row className="my-2">
                            <Col className="text-sm-start" xs={12} sm={6}>
                                <h2>{pieceData.piece.title}</h2>
                            </Col>
                            <Col className="text-sm-end" xs={12} sm={6}>
                                <Rating
                                    initialRating={pieceData.piece.avgRating}
                                    style={{ color: 'goldenrod' }}
                                    emptySymbol="fa fa-star-o fa-xl"
                                    fullSymbol="fa fa-star fa-xl"
                                    fractions={2}
                                    onChange={handleRating}
                                />
                            </Col>
                        </Row>
                        <Row className="text-sm-start">
                            <p>{pieceData.piece.artType}</p>
                            <p>{pieceData.piece.createdDate}</p>
                        </Row>
                    </Container>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Container>
                                {/* Comment Field */}
                                <Row className="align-items-end">
                                    <Col sm={10}>
                                        <FloatingLabel controlId="commentBox" label="Comment">
                                            <Form.Control
                                                required
                                                as="textarea"
                                                style={{ height: '125px' }}
                                                placeholder="Type your comment here..."
                                                name="comment"
                                                value={comment}
                                                onChange={handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col sm={2} className="text-end flex-grow-1">
                                        {/* Submit Button */}
                                        <Button type="submit" className="mx-auto mt-2 w-100" disabled={!comment}>
                                            Post
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                    <Container className="mt-5 text-start">
                        <h3>Comments</h3>
                        <br></br>
                        {/* Render comments in chronological order */}
                        {comments.map((comment) => (
                            <Comment classname='mt-3' key={comment.id} comment={comment} />
                        ))}
                    </Container>
                </>
            )}
        </>
    );
};

export default DetailView;
