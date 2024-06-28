import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTvCredits] = useState([]);
  const [poster, setPoster] = useState("https://image.tmdb.org/t/p/w500");

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=en-US&api_key=8f9eb3b363239045387cf1221776d908`);
        setPerson(res.data);
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    };
    fetchPersonDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=tr-TR&api_key=${API_KEY}`);
        setMovieCredits(res.data.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
      }
    };
    fetchMovieCredits();
  }, [id]);

  useEffect(() => {
    const fetchTvCredits = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?language=tr-TR&api_key=8f9eb3b363239045387cf1221776d908`);
        setTvCredits(res.data.cast);
      } catch (error) {
        console.error('Error fetching TV credits:', error);
      }
    };
    fetchTvCredits();
  }, [id]);

  const handleMovieClick = (movieId) => {
    navigate(`/${movieId}/movie-details`)
  };

  const handleTvClick = (tvId) => {
    navigate(`/${tvId}/series-details`)
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-center items-center mt-8">
        <img src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : '/default-profile.jpg'} className="w-64 h-96 rounded-lg border-2 border-black" alt={person.name} />
        <div className="ml-8">
          <h1 className="text-3xl font-semibold">{person.name}</h1>
          <p className="text-lg text-gray-600">Doğum Yeri: {person.place_of_birth}</p>
          <p className="text-lg text-gray-600">Doğum Tarihi: {person.birthday}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Biography</h2>
            <p className="mt-2 text-lg text-gray-700">{person.biography}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Filmography</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movieCredits.map((movie, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg cursor-pointer" onClick={() => handleMovieClick(movie.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full mb-2" />
              <h3 className="text-xl font-semibold">{movie.title}</h3>
              <p className="text-gray-600">{movie.release_date ? `Release Date: ${movie.release_date}` : "Release Date Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tvCredits.map((show, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg cursor-pointer" onClick={() => handleTvClick(show.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className="w-full mb-2" />
              <h3 className="text-xl font-semibold">{show.name}</h3>
              <p className="text-gray-600">{show.first_air_date ? `First Air Date: ${show.first_air_date}` : "First Air Date Unknown"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
