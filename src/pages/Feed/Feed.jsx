import { useContext } from "react";
import { Masonry } from "masonic";
import { PieceCard } from "../../components/Piece/Piece";
import { PieceDataContext } from "../../contexts/PieceDataContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const Feed = () => {
    // Providing the custom context for Pieces to the context hook
    const pieceDataContext = useContext(PieceDataContext);
    const userContext = useContext(CurrentUserContext)
    const navigate = useNavigate()

    // If the user isn't logged in, this redirects them to the login page
    if (!userContext.currentUser) {
        navigate('/login')
    }

    return (
        <div className="p-3">
            {(pieceDataContext.loading) ? '' : <Masonry items={pieceDataContext.data} render={MasonryTile} columnGutter={5} className="p-5" />}
        </div>
    )
};

const MasonryTile = ({ data }) => (
    <PieceCard {...data} />
);

export default Feed;