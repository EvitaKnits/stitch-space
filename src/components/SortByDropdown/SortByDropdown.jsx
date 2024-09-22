import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';

// This component  updates the "sortBy" parameter on the Pieces requests
const SortByDropdown = ({setParams}) => {

    const handleSelect = (eventKey) => {
        setParams((prevParams) => ({
            ...prevParams,
            sortBy: eventKey,
        }));
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" align={{ lg: 'end' }}>
                <FontAwesomeIcon icon={faArrowUpWideShort} className="me-2" />
                Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="nameAsc">Piece Name A-Z</Dropdown.Item>
                <Dropdown.Item eventKey="nameDesc">Piece Name Z-A</Dropdown.Item>
                <Dropdown.Item eventKey="mostLikes">Most Likes</Dropdown.Item>
                <Dropdown.Item eventKey="leastLikes">Least Likes</Dropdown.Item>
                <Dropdown.Item eventKey="mostDiscussed">Most Discussed</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SortByDropdown;