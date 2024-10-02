import { Nav } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import { MasonryWall } from '../../components/Piece/Piece'
import usePiecesList from '../../hooks/usePiecesList'
import useSelectedProfile from '../../hooks/useSelectedProfile'

const ListView = () => {
    const { isAuthUserProfile, ...profileData } = useSelectedProfile()
    const { profileId } = useParams()

    const { pieces, loading, setParams, ...rest } = usePiecesList({
        profile__owner__id: profileId,
    })

    // Adjust the parameters in the request based on the selected filters
    const handleArtTypeSelect = (eventKey) => {
        setParams((prevData) => {
            const newData = { ...prevData }
            delete newData['art_type']
            if (eventKey !== 'all') newData.art_type = eventKey
            return newData
        })
    }

    // Modified pieces array to add button for new piece creation
    const modifiedPieces = !loading
        ? pieces.map((piece) => ({ ...piece, hideUserName: true }))
        : []
    if (!loading) {
        if (isAuthUserProfile) {
            modifiedPieces.unshift({
                id: 0,
                isAddNewButton: true,
                profile: profileId,
                // Provide default values for required props
                title: '',
                image: '',
                userName: '',
                artType: '',
                caption: '',
                hideUserName: true,
            })
        }
    }

    return (
        !profileData.loading &&
        pieces && (
            <>
                <Nav
                    variant="underline"
                    defaultActiveKey="all"
                    className="mb-3"
                    onSelect={handleArtTypeSelect}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="all">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="knitting">Knitting</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="embroidery">Embroidery</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="crochet">Crochet</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="weaving">Weaving</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="dyeing">Dyeing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="other">Other</Nav.Link>
                    </Nav.Item>
                </Nav>
                {modifiedPieces.length > 0 && (
                    <MasonryWall pieces={modifiedPieces} {...rest} />
                )}
            </>
        )
    )
}

export default ListView
