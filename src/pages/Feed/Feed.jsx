import { useContext } from "react";
import { MasonryWall } from "../../components/Piece/Piece";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import usePiecesList from "../../hooks/usePiecesList";

const Feed = () => {
    // Providing the custom context for Pieces to the context hook
    const userContext = useContext(CurrentUserContext)
    const { loading, pieces } = usePiecesList();
    const navigate = useNavigate()

    // If the user isn't logged in, this redirects them to the login page
    if (!userContext.currentUser) {
        navigate('/login')
    }

    return (
        <div className="p-3">
            {(!loading && pieces) ?<MasonryWall pieces={pieces}/> : ''}
        </div>
    )
};

export default Feed;