import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap'

const Comment = ({ comment }) => {
    return (
        <Card className="mb-3" border="light" shadow="sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className="me-2 icons" />
                        <Card.Title className="mb-0">
                            {comment.profile.firstName}{' '}
                            {comment.profile.lastName}
                        </Card.Title>
                    </div>
                </div>
                <Card.Text className="mb-2 text-start">
                    {comment.content}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted text-end small">
                {new Date(comment.createdAt).toLocaleString()}
            </Card.Footer>
        </Card>
    )
}

export default Comment
