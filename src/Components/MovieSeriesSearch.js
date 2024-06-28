import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieSeriesSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const API_KEY=process.env.REACT_APP_API_KEY;
  const navigate = useNavigate();

  const search = async () => {
    try {
      setSearching(true);

      const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${searchQuery}`);
      const seriesResponse = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=tr-TR&query=${searchQuery}`);

      setSearchResults({
        movies: movieResponse.data.results,
        series: seriesResponse.data.results
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Filmleri ve Dizileri Ara..."
          className="w-full py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={search}
          className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ara
        </button>
      </div>

      <div className="mt-4">
        {searching && <p>Aranıyor...</p>}
        {searchResults.movies && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Filmler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.movies.map((movie, index) => (
                <div key={index} className="flex flex-col items-center ">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="w-32 h-48 object-cover rounded-md shadow-md cursor-pointer  " alt={movie.title} onClick={() => navigate(`/${movie.id}/movie-details`)} />
                  <p className="mt-2 text-sm text-center hover:text-red-500 text-gray-800 cursor-pointer" onClick={() => navigate(`/${movie.id}/movie-details`)} >{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {searchResults.series && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Diziler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {searchResults.series.map((series, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`} className="w-32 h-48 object-cover rounded-md shadow-md cursor-pointer" alt={series.name} onClick={() => navigate(`/${series.id}/series-details`)} />
                  <p className="mt-2 text-sm text-center hover:text-red-500 text-gray-800 cursor-pointer" onClick={() => navigate(`/${series.id}/series-details`)}>{series.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSeriesSearch;
