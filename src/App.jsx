import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { PieceDataProvider } from './contexts/PieceDataContext';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Explore from './pages/Explore/Explore';
import Login from './pages/Login/Login';
import MyStitchSpace from './pages/MyStitchSpace/MyStitchSpace';
import Register from './pages/Register/Register';
import UserDetails from './pages/UserDetails/UserDetails';
import NotFound from './pages/NotFound/NotFound';


function App() {
    return (
        <div className={`App ${styles.App}`}>
            <header className={`App-header ${styles['App-header']}`}>
                <div>
                    <h1><FontAwesomeIcon icon={faStroopwafel} size='xl' className='icons' /> Stitch Space</h1>
                    <h2>- the fibre art community</h2>
                </div>
                <NavBar />
                {/* This Provider allows components on all pages to search for Pieces */}
                <PieceDataProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/feed" element={<Feed />} />
                            <Route path="/explore" element={<Explore />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/mystitchspace" element={<MyStitchSpace />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/userdetails" element={<UserDetails />} />
                            {/* 404 route for unmatched paths */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </PieceDataProvider>
            </header>
        </div>
    );
};

export default App;
