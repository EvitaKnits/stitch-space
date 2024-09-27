import { MasonryWall } from "../../components/Piece/Piece";
import usePiecesList from "../../hooks/usePiecesList";

const Feed = () => {
    // Providing the custom context for Pieces to the context hook
    const { loading, pieces } = usePiecesList();

    return (
        <div className="p-3">
            {(!loading && pieces) ?<MasonryWall pieces={pieces}/> : ''}
        </div>
    )
};

export default Feed;