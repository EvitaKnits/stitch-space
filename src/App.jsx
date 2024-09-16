import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import FeaturedArtists from './components/FeaturedArtists/FeaturedArtists';

function App() {
    return (
        <div className={`App ${styles.App}`}>
            <header className={`App-header ${styles['App-header']}`}>
                <div>
                    <h1><FontAwesomeIcon icon={faStroopwafel} size='xl' className='icons' /> Stitch Space</h1>
                    <h2>- the fibre art community</h2>
                </div>
                <NavBar />
                <About />
                <h2>Featured Artists</h2>
                <FeaturedArtists />
            </header>
        </div>
    );
};

export default App;
