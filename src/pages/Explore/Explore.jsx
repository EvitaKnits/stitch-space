import { useContext } from 'react';
import { Masonry } from 'masonic';
import { PieceCard } from '../../components/Piece/Piece';
import { PieceDataContext } from '../../contexts/PieceDataContext';
import Stack from 'react-bootstrap/Stack';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArtTypeDropdown from '../../components/ArtTypeDropdown/ArtTypeDropdown';
import SortByDropdown from '../../components/SortByDropdown/SortByDropdown';

const Explore = () => {
    const { data, loading } = useContext(PieceDataContext);

    return (
        <div className="p-3">
            <h5>Search by piece or artist name, or leave blank and explore with filters</h5>
            <Stack direction="horizontal" gap={4} className="flex-wrap p-3 justify-content-center">
                <div className="flex-fill">
                    <SearchBar />
                </div>
                <Stack direction="horizontal" gap={4} className="flex-no-wrap">
                    <div>
                        <ArtTypeDropdown />
                    </div>
                    <div className="vr" />
                    <div>
                        <SortByDropdown />
                    </div>
                </Stack>
            </Stack>
            {!loading && data && (
                // 'Masonic' library handles the tiling of the Piece components
                <Masonry
                    items={data}
                    render={MasonryTile}
                    columnGutter={5}
                    className="p-5"
                />
            )}
        </div>
    );
};

const MasonryTile = ({ data }) => <PieceCard {...data} />;

export default Explore;