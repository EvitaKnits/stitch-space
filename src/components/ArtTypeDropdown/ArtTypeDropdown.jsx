import { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { PieceDataContext } from '../../contexts/PieceDataContext';

// This component filters the "artType" parameter on the Pieces requests
const ArtTypeDropdown = () => {
    const { setParams } = useContext(PieceDataContext);
    const [selection, setSelection] = useState('');

    const handleSelect = (eventKey) => {
        // Stores selection to enable highlighting of selected item in the dropdown
        setSelection(eventKey);
        setParams((prevParams) => ({
            ...prevParams,
            artType: eventKey,
        }));
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" align={{ lg: 'end' }}>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Art Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item active={selection === 'Knitting'} eventKey="Knitting">Knitting</Dropdown.Item>
                <Dropdown.Item active={selection === 'Crochet'} eventKey="Crochet">Crochet</Dropdown.Item>
                <Dropdown.Item active={selection === 'Embroidery'} eventKey="Embroidery">Embroidery</Dropdown.Item>
                <Dropdown.Item active={selection === 'Weaving'} eventKey="Weaving">Weaving</Dropdown.Item>
                <Dropdown.Item active={selection === 'Dyeing'} eventKey="Dyeing">Dyeing</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item active={selection === 'Other'} eventKey="Other">Other</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ArtTypeDropdown;