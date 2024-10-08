import { useContext, useEffect, useState } from 'react'
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Image,
    Row,
} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Rating from 'react-rating'
import { Link, useNavigate } from 'react-router-dom'

import axiosClient from '../../api/axiosDefaults'
import Comment from '../../components/Comments/Comment'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useSelectedPiece from '../../hooks/useSelectedPiece'
import useSelectedProfile from '../../hooks/useSelectedProfile'
import PiecesEdit from './PiecesEdit'

const DetailView = () => {
    const { currentUser } = useContext(CurrentUserContext)
    const { selectedProfile, loading } = useSelectedProfile()
    const pieceData = useSelectedPiece()

    const [comment, setComment] = useState('')
    const [editMode, setEditMode] = useState(false)

    // Mock data for comments
    const [comments, setComments] = useState([])

    // Handle user rating
    const handleUserRating = (value) => {
        const ratePiece = async () => {
            try {
                if (!pieceData.piece.userRating) {
                    await axiosClient.post(
                        `pieces/${pieceData.selectedPiece}/ratings/`,
                        {
                            score: parseInt(value),
                        }
                    )
                } else {
                    await axiosClient.put(
                        `ratings/${pieceData.piece.userRating.id}/`,
                        {
                            score: parseInt(value),
                        }
                    )
                }
                pieceData.setRefresh(true)
            } catch (err) {
                console.log(err.response?.data)
            }
        }
        ratePiece()
    }

    // If the user submits the edit form, change the view
    const handleEdit = () => {
        pieceData.setRefresh(true)
        setEditMode(false)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!pieceData.loading) {
            try {
                const fetchComments = async () => {
                    try {
                        const response = await axiosClient.get(
                            `pieces/${pieceData.selectedPiece}/comments/`,
                            { params: { page_size: 200 } }
                        )
                        setComments(response.data?.results || [])
                    } catch (err) {
                        console.log(err.response?.data)
                    }
                }
                fetchComments()
            } catch (error) {
                // Handle errors gracefully
                console.error('Error fetching comments (placeholder):', error)
            }
        }
    }, [pieceData.loading, pieceData.selectedPiece])

    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this piece?'
        )
        if (!confirmDelete) return

        try {
            const createPiece = async () => {
                try {
                    await axiosClient.delete(
                        `pieces/${pieceData.selectedPiece}/`
                    )
                    // Navigate back to the pieces list
                    navigate(`/profile/${selectedProfile}`)
                } catch (err) {
                    console.log(err.response?.data)
                }
            }
            if (!loading && currentUser) createPiece()
        } catch (error) {
            // Handle errors gracefully
            console.error('Error deleting the piece (placeholder):', error)
            alert('Failed to delete the piece (placeholder). Please try again.')
        }
    }

    // Opens up the 'Edit' view
    const handleEditClick = () => {
        setEditMode(true)
    }

    // If the user cancels their edits without making changes, close the view
    const handleEditCancel = () => {
        setEditMode(false)
    }

    // Comment form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const fetchComments = async () => {
                try {
                    const response = await axiosClient.post(
                        `pieces/${pieceData.selectedPiece}/comments/`,
                        { content: comment }
                    )
                    // Add comment to the top of the list
                    setComments([response.data, ...comments])
                    // Clear the textarea
                    setComment('')
                } catch (err) {
                    console.log(err.response?.data)
                }
            }
            fetchComments()
        } catch (error) {
            // Handle errors gracefully
            console.error('Error fetching comments (placeholder):', error)
        }
    }

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    // Determine if current user is the owner of the piece
    const isOwner =
        currentUser &&
        pieceData.piece &&
        currentUser.pk === pieceData.piece.profile.id

        // If a URl gets entered manually for a profile that doesn't match the
        // profile associated with the piece, show an error
    if (
        !pieceData.loading &&
        !loading &&
        pieceData.piece.profile.id.toString() !== selectedProfile
    ) {
        return <div>Not this person&apos;s artwork</div>
    }

    if (pieceData.loading) {
        return ''
    }
    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
        const formattedDate = date.toLocaleDateString(undefined, dateOptions)
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions)
        return `${formattedTime} | ${formattedDate}`
    }

    const formattedDateTime = pieceData.piece?.createdAt
        ? formatDateTime(pieceData.piece.createdAt)
        : 'Unknown Date and Time'

    return (
        <>
            {editMode ? (
                // Render PiecesEdit component
                <PiecesEdit
                    piece={pieceData.piece}
                    onCancel={handleEditCancel}
                    onEdit={handleEdit}
                />
            ) : (
                <>
                    <Container>
                        <Row className="my-2">
                            <Col className="text-start">
                                <Button
                                    className="me-2"
                                    as={Link}
                                    to={`/profile/${selectedProfile}`}
                                >
                                    Back to all art
                                </Button>
                                {/* Edit and Delete Buttons visible to owner */}
                                {isOwner && (
                                    <>
                                        <Button
                                            onClick={handleEditClick}
                                            className="me-2"
                                        >
                                            Edit Piece
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={handleDeleteClick}
                                            className="mt-2 mt-sm-0"
                                        >
                                            Delete Piece
                                        </Button>
                                    </>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Image
                                src={pieceData.piece.image}
                                className="w-auto mx-auto"
                                style={{ maxHeight: '75vh' }}
                                alt="Image of the art piece"
                            />
                        </Row>
                        <Row className="my-2">
                            <Col className="text-sm-start" xs={12} sm={6}>
                                <h2>{pieceData.piece.title}</h2>
                            </Col>
                            <Col className="text-sm-end" xs={12} sm={6}>
                                <Container>
                                    {/* User's Rating (only if not the owner of this piece) */}
                                    {!isOwner && currentUser && (
                                        <Row>
                                            <strong>Your Rating:</strong>
                                            <Rating
                                                initialRating={
                                                    pieceData.piece?.userRating
                                                        ?.score || 0
                                                }
                                                emptySymbol="fa fa-star-o fa-xl"
                                                fullSymbol="fa fa-star fa-xl"
                                                fractions={2}
                                                onChange={handleUserRating}
                                                style={{ color: 'goldenrod' }}
                                            />
                                        </Row>
                                    )}
                                    {/* Community Average Rating */}
                                    <Row>
                                        <strong>Avg. Rating</strong>
                                        <Rating
                                            readonly
                                            initialRating={
                                                pieceData.piece.rating
                                            }
                                            emptySymbol="fa fa-star-o fa-md"
                                            fullSymbol="fa fa-star fa-md"
                                            fractions={2}
                                            style={{ color: 'grey' }}
                                        />
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row className="text-sm-start">
                            <p>{pieceData.piece.artType}</p>
                            <p>{formattedDateTime}</p>
                        </Row>
                    </Container>
                    <div>
                        <Form onSubmit={handleSubmit}>
                            <Container>
                                {/* Comment Field */}
                                <Row className="align-items-end">
                                    <Col sm={10}>
                                        <FloatingLabel
                                            controlId="commentBox"
                                            label="Comment"
                                        >
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
                                    <Col
                                        sm={2}
                                        className="text-end flex-grow-1"
                                    >
                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            className="mx-auto mt-2 w-100"
                                            disabled={!comment}
                                        >
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
                            <Comment
                                classname="mt-3"
                                key={comment.id}
                                comment={comment}
                            />
                        ))}
                    </Container>
                </>
            )}
        </>
    )
}

export default DetailView
