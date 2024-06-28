import React, { useState } from 'react';
import PopularMovies from './PopularMovies';
import './styles.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import TopRatedMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies';
import Home from './Home';
import PopularSeries from './PopularSeries';
import SeriesDetails from './SeriesDetails';
import TopRatedSeries from './TopRatedSeries';
import PersonDetails from './PersonDetails'
import MovieSeriesSearch from './MovieSeriesSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Layout = () => {
    const [moviesvis, setMovievis] = useState(false);
    const [uservis, setUservis] =useState(false)
    const [seriesvis, setSeriesvis] = useState(false);
    

    const navigateTo = (path) => {
        window.location.href = path;
      };
    
      const handleClick = (e) => {
        e.preventDefault();
        setUservis(!uservis);
      }

    const handleVisible = (e) => {
        e.preventDefault();
        setMovievis(!moviesvis);
        setSeriesvis(false)
    };
    const handleVisible2 = (e) => {
      e.preventDefault();
      setSeriesvis(!seriesvis);
      setMovievis(false)
  };


    return (
        <div>
    
           <Router>
            <div className='flex max-w-screen mx-auto sticky-header top-0 w-full h-20 lg: bg-image '>
              
                <div className='flex items-center ml-64 relative'>
                    <h1 className='font-bold text-red-400 font-mono bg-white h-12 py-2 m-3 text-xl w-32 px-7 rounded hover:text-red-500'>MOVIES</h1>
                    <h2 className='font-bold text-white pl-3 cursor-pointer hover:text-red-500' onClick={() => navigateTo('/')}>Ana Sayfa </h2>
                    <span className='font-bold text-white pl-3 cursor-pointer hover:text-red-500' onMouseEnter={handleVisible}>Filmler</span>
                    <span className='font-bold text-white pl-3 cursor-pointer hover:text-red-500' onMouseEnter={handleVisible2}>Diziler</span>
                    <div className='flex justify-end'>
                      <nav className=''>
                    <Link className="flex font-bold text-white pl-3 cursor-pointer hover:text-red-500" to="/searching">
                           Film ve Dizi ara
                   <FontAwesomeIcon icon={faSearch} className="my-1 mx-2" />
                  </Link>
                  </nav>
                    </div>
                    
          {moviesvis ? (
            <div className='dropdown-menu left-60 translate-x-3 top-14 w-44 h-28 p-2 rounded'>
              <div className='p-2'>
              <nav>
                  <Link className="text-black hover:text-red-500"to="/popular-movies">Popüler</Link>
            </nav>
            <nav>
                  <Link className="text-black hover:text-red-500"to="/top-rated-movies">En fazla oy alanlar</Link>
            </nav>
            <nav>
                  <Link className="text-black hover:text-red-500"to="/upcoming-movies">Yakında</Link>
            </nav>
              </div>
            </div>
            
          ) : null}
          
                </div>
                {seriesvis ? (
                
            <div className='dropdown-menu translate-x-96 left-48 top-14 w-44 h-28 p-2 rounded '>
              <div className='p-2'>
              <nav>
                  <Link className="text-black hover:text-red-500"to="/popular-series">Popüler</Link>
            </nav>
            <nav>
                  <Link className="text-black hover:text-red-500"to="/top-rated-series">En çok oy alanlar</Link>
            </nav>
           
              </div>
            </div>
         
          ) : null}
                
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
             <Route path="/popular-movies" element={<PopularMovies />} />
             <Route path="/top-rated-movies" element={<TopRatedMovies />} />
             <Route path="/upcoming-movies" element={<UpcomingMovies />} />
             <Route path="/searching" element={<MovieSeriesSearch />} />
            
             <Route path="/popular-series" element={<PopularSeries />} />
             <Route path="/:id/movie-details" element={<MovieDetails/>} />
             <Route path="/:id/series-details" element={<SeriesDetails/>} />
             <Route path="/top-rated-series" element={<TopRatedSeries />} />
             <Route path="/:id/person-details" element={<PersonDetails />} />
            </Routes>
            </Router>
        </div>
    );
};

export default Layout;
