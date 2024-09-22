import { useState } from "react";
import { Alert, Button, Container, Image, Row, Col, FloatingLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Rating from "react-rating";
import useSelectedPiece from "../../hooks/useSelectedPiece";
import useSelectedProfile from "../../hooks/useSelectedProfile";

const DetailView = () => {
    const profileData = useSelectedProfile();
    const pieceData = useSelectedPiece()

    const [comment, setComment] = useState('');
    const handleRating = (value) => {
        console.log(value)
    }

    const handleSubmit = () => { };
    const errors = true;
    const handleChange = (event) => {
        setComment(event.target.value);
    };

    if (!pieceData.loading && !profileData.loading && pieceData.piece.userId.toString() !== profileData.selectedProfile) return <div>Not this person&apos;s artwork</div>

    return pieceData.loading ? '' : (<>
        <Container>
            <Row>
                <Image src={pieceData.piece.image} className="w-auto mx-auto" style={{ maxHeight: '75vh' }} />
            </Row>
            <Row className="my-2">
                <Col className="text-sm-start" xs={12} sm={6}><h2>{pieceData.piece.title}</h2></Col>
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
            <Row className="text-sm-start" >
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

                    {/* Non-field Errors */}
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Container>
            </Form>
        </div>
        <div>Comments List</div>
    </>
    )
}

export default DetailView