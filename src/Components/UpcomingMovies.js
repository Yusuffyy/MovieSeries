import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingMovies = () => {
  const [poster, setPoster] = useState("https://image.tmdb.org/t/p/w500");
  const [page, setPage] = useState(1);
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [totalPages, setTotalPages] = useState(1);
  const API_KEY=process.env.REACT_APP_API_KEY;
  const loadMore = () => {
    setPage(page + 1); // Increase the page number to load more data
  };

  
  

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading

        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?language=tr-TR&page=${page}&api_key=${API_KEY}`
        );
        setItem((prevItems) => [...prevItems, ...res.data.results]); // Append new data
        setTotalPages(res.data.total_pages);
        setIsLoading(false); // Loading finished
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page]);

  return (
   <div>
     <div className='relative max-w-screen-2xl mx-auto p-4 mt-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 border-2 border-white gap-7'>
        {item.map((x) => (
          <div key={x.id} className='hover:transform transition duration-300 hover:scale-105 cursor-pointer rounded-lg shadow-2xl items-center ' onClick={() => navigate(`/${x.id}/movie-details`)}>
            <div className="flex justify-end ">
           <div className={`absolute flex items-center justify-center w-14 h-14 border-2 p-3 text-2xl text-extrabold brightness-200 rounded-full ${
               x.vote_average >= 7
              ? 'text-green-500'
              : x.vote_average >= 5
                ? 'text-yellow-400'
                : x.vote_average >= 4 
                ? "text-yellow-500"
                : "text-red-500"
             }`}>
             <h1>{x.vote_average}</h1>
           </div>
          </div>
           
            <img src={`${poster}${x.poster_path}`} className='rounded hover:text-red-500' alt={x.title} />
            <div className='flex justify-center items-center py-4'>
            <h2 className='w-64 font-semibold text-black hover:text-red-500 text-center'>{x.title}</h2>
            </div>
          </div>
        ))}
      </div>
</div>

<div className='flex justify-center'>
             
             <div className="flex justify-center w-5/6">
         
               <button
                 className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                 onClick={loadMore}
                 disabled={isLoading || page >= totalPages} // Disable button when loading or at the end of pages
               >
                 {isLoading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
               </button>
             </div>
             </div> 
  );

    </div>
  );
}

export default UpcomingMovies;
