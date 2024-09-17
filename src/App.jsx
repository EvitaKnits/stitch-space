import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Login from './pages/Login';
import MyStitchSpace from './pages/MyStitchSpace';
import Register from './pages/Register';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';


function App() {
    return (
        <div className={`App ${styles.App}`}>
            <header className={`App-header ${styles['App-header']}`}>
                <div>
                    <h1><FontAwesomeIcon icon={faStroopwafel} size='xl' className='icons' /> Stitch Space</h1>
                    <h2>- the fibre art community</h2>
                </div>
                <NavBar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/feed" element={<Feed/>} />
                        <Route path="/explore" element={<Explore/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/mystitchspace" element={<MyStitchSpace/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/userdetails" element={<UserDetails/>} />
                        {/* 404 route for unmatched paths */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
};

export default App;
