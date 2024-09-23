import { MasonryWall } from "../../components/Piece/Piece";
import Stack from 'react-bootstrap/Stack';
import SearchBar from '../../components/SearchBar/SearchBar';
import ArtTypeDropdown from '../../components/ArtTypeDropdown/ArtTypeDropdown';
import SortByDropdown from '../../components/SortByDropdown/SortByDropdown';
import usePiecesList from '../../hooks/usePiecesList';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Explore = () => {
    const userContext = useContext(CurrentUserContext)
    const navigate = useNavigate();
    const {
        pieces,
        loading,
        setParams
    } = usePiecesList()

    // If the user isn't logged in, this redirects them to the login page
    if (!userContext.currentUser) {
        navigate('/login')
    }

    return (
        <div className="p-3">
            <h5>Search by piece or artist name, or leave blank and explore with filters</h5>
            <Stack direction="horizontal" gap={4} className="flex-wrap p-3 justify-content-center">
                <div className="flex-fill">
                    <SearchBar setParams={setParams} />
                </div>
                <Stack direction="horizontal" gap={4} className="flex-no-wrap">
                    <div>
                        <ArtTypeDropdown setParams={setParams} />
                    </div>
                    <div className="vr" />
                    <div>
                        <SortByDropdown setParams={setParams} />
                    </div>
                </Stack>
            </Stack>
            {!loading && pieces && (
                <MasonryWall pieces={pieces} />
            )}
        </div>
    );
};

export default Explore;