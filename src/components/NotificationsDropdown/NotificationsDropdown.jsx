import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import styles from "./NotificationsDropdown.module.css";
import { NavItem } from 'react-bootstrap';

const NotificationsDropdown = () => {
    const hasNewNotifications = true;

    // Mock data - simulate a list of 50 notifications
    const mockNotifications = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        type: ['follow', 'rating', 'comment'][index % 3],
        actor: { username: `User${index % 10}` },
        piece_name: `Piece${index % 5}`,
        rating: (index % 5) + 1,
        timestamp: new Date(Date.now() - index * 60000), // Timestamps decreasing by 1 minute
        link: `/notification/${index + 1}`
    }));

    const renderNotificationText = (notification) => {
        switch (notification.type) {
            case 'follow':
                return <><FontAwesomeIcon
                icon={faEye}
                className='icons me-2'
                style={{ color:'blue' }}
            />{`${notification.actor.username} started following you`}</>
            case 'rating':
                return <><FontAwesomeIcon
                icon={faStar}
                className='icons me-2'
                style={{ color:'blue' }}
            />{`${notification.actor.username} rated ${notification.piece_name} ${notification.rating}`}</>;
            case 'comment':
                return <><FontAwesomeIcon
                icon={faComment}
                className='icons me-2'
                style={{ color:'blue' }}
            />{`${notification.actor.username} commented on ${notification.piece_name}`}</>;
            default:
                return 'Unknown notification type';
        }
    };

    return (
        <Dropdown as={NavItem} className="m-1">
            <Dropdown.Toggle className={styles.NavDropdownButton} size="lg">
                <FontAwesomeIcon
                    icon={faBell}
                    className='icons'
                    style={{ color: hasNewNotifications ? 'yellow' : 'revert-layer' }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.NotificationsMenu} style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflowX: 'hidden',
                scrollbarColor: 'blue green',
                width:'min-content'
            }}>
                {mockNotifications.length > 0 ? (
                    mockNotifications.map((notification) => (
                        <Dropdown.Item
                            key={notification.id}
                            className={styles.NotificationItem + ' p-3'}
                            href={notification.link}
                        >
                            {renderNotificationText(notification)}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item className={styles.NotificationItem}>
                        No notifications
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationsDropdown;
