import { Nav } from "react-bootstrap";
import { MasonryWall } from "../../components/Piece/Piece";
import { useParams } from 'react-router-dom';
import useSelectedProfile from "../../hooks/useSelectedProfile";
import usePiecesList from "../../hooks/usePiecesList";

const ListView = () => {
    const {
        isAuthUserProfile,
        ...profileData
    } = useSelectedProfile();
    const { profileId } = useParams();

    const { pieces, params, setParams } = usePiecesList({ profile__owner__id: profileId })

    const handleArtTypeSelect = (eventKey) => {
        setParams({ ...(params), artType: eventKey })
    }

    return !profileData.loading && pieces && (<>
        <Nav variant="underline" defaultActiveKey="all" className="mb-3" onSelect={handleArtTypeSelect}>
            <Nav.Item><Nav.Link eventKey="all">All</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="knitting">Knitting</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="embroidery">Embroidery</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="crochet">Crochet</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="weaving">Weaving</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="dyeing">Dyeing</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="other">Other</Nav.Link></Nav.Item>
        </Nav>
        {isAuthUserProfile ? 'Add Button' : ''}
        <MasonryWall pieces={pieces}/>
    </>
    )
}

export default ListView