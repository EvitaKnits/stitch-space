import { Fade } from 'react-bootstrap'
import Stack from 'react-bootstrap/Stack'

import ArtTypeDropdown from '../../components/ArtTypeDropdown/ArtTypeDropdown'
import { MasonryWall } from '../../components/Piece/Piece'
import SearchBar from '../../components/SearchBar/SearchBar'
import SortByDropdown from '../../components/SortByDropdown/SortByDropdown'
import usePiecesList from '../../hooks/usePiecesList'

const Explore = () => {
    const { pieces, loading, setParams, params, ...rest } = usePiecesList()

    return (
        <div className="p-3">
            <h3>
                Search by piece or artist name, or leave blank and explore with
                filters
            </h3>
            <Fade in={!loading}>
                <Stack
                    direction="horizontal"
                    gap={4}
                    className="flex-wrap p-3 justify-content-center"
                >
                    <div className="flex-fill">
                        <SearchBar params={params} setParams={setParams} />
                    </div>
                    <Stack
                        direction="horizontal"
                        gap={4}
                        className="flex-no-wrap"
                    >
                        <div>
                            <ArtTypeDropdown
                                params={params}
                                setParams={setParams}
                            />
                        </div>
                        <div className="vr" />
                        <div>
                            <SortByDropdown
                                params={params}
                                setParams={setParams}
                            />
                        </div>
                    </Stack>
                </Stack>
            </Fade>
            {!loading && pieces && <MasonryWall pieces={pieces} {...rest} />}
        </div>
    )
}

export default Explore
