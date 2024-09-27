import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

// This component filters the "artType" parameter on the Pieces requests
const ArtTypeDropdown = ({ setParams }) => {
    const [selection, setSelection] = useState('');

    const handleSelect = (eventKey) => {
        // Stores selection to enable highlighting of selected item in the dropdown
        setSelection(eventKey);
        setParams((prevData) => {
            const newData = { ...prevData }
            delete newData["art_type"]
            if (eventKey !== 'all') newData.art_type = eventKey
            return newData;
        });
    };

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic" align={{ lg: 'end' }}>
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Art Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {!!selection && (<><Dropdown.Item active={selection === 'all'} eventKey="all">All</Dropdown.Item><Dropdown.Divider /></>)}
                <Dropdown.Item active={selection === 'knitting'} eventKey="knitting">Knitting</Dropdown.Item>
                <Dropdown.Item active={selection === 'crochet'} eventKey="crochet">Crochet</Dropdown.Item>
                <Dropdown.Item active={selection === 'embroidery'} eventKey="embroidery">Embroidery</Dropdown.Item>
                <Dropdown.Item active={selection === 'weaving'} eventKey="weaving">Weaving</Dropdown.Item>
                <Dropdown.Item active={selection === 'dyeing'} eventKey="Dyeing">Dyeing</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item active={selection === 'other'} eventKey="other">Other</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ArtTypeDropdown;