import NotFoundImage from '../../assets/404image.jpg'
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.container}>
            <img
                src={NotFoundImage}
                alt="Tangled yarn"
                className={styles.image}
            />
            <div>
                <h2>Oops! You have found a tangled thread.</h2>
                <p>
                    It seems like the page you are looking for has unraveled.
                    Use any link in the menu bar to go elsewhere!
                </p>
            </div>
        </div>
    )
}

export default NotFound
