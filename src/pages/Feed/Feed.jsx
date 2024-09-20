import { useContext } from "react";
import { Masonry } from "masonic";
import { PieceCard } from "../../components/Piece/Piece";
import { PieceDataContext } from "../../contexts/PieceDataContext";

const Feed = () => {
    // Providing the custom context for Pieces to the context hook
    const pieceDataContext = useContext(PieceDataContext);
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