import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [poster, setPoster] = useState("https://image.tmdb.org/t/p/w500");
    const[items , setItems] = useState([])
    const[items2, setItems2] = useState([])
    const[items3 , setItems3] = useState([])
    const [items4 ,setItems4] = useState([])
    const[page , setPage] = useState(1)
    const navigate = useNavigate()
    const API_KEY=process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?language=tr-TR&page=${page}&api_key=${API_KEY}`)
            setItems4(res.data.results.splice(0,10))
        }
     
        fetchData();
    },[page, API_KEY])
    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=tr-TR&page=${page}&api_key=${API_KEY}`)
            setItems(res.data.results.splice(0,10))
        }
     
        fetchData();
    },[page, API_KEY])

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?language=tr-TR&page=${page}&api_key=${API_KEY}`)
            setItems2(res.data.results.splice(0,10))
        }
     
        fetchData();
    },[page, API_KEY])

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=tr-TR&page=${page}&api_key=${API_KEY}`)
            setItems3(res.data.results.splice(0,10))
        }
     
        fetchData();
    },[page, API_KEY])
    return (
    <div className='grid grid-cols-1 bg-image pt-14'>
        <div className='flex mx-40 border-4 bg-image border-white rounded p-4'>
                <div>
                    <div>
                        <h1 className='absolute -my-12 -mx-5 text-red-500 font-bold'>TOP 10 POPÜLER FİLMLER</h1>
                    </div>
                    <div>
                        <h1 className='absolute right-0 mx-40 -my-12 text-orange-600 font-bold cursor-pointer bold' onClick={() => navigate(`/popular-movies`)}>Tümünü Gör</h1>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        items.map((x) => (
                            <div key={x.key}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                                    className="cursor-pointer rounded w-100 brightness-100 hover:scale-105 transform transition duration-300"
                                    onClick={() => navigate(`/${x.id}/movie-details`)}
                                    alt={x.title}
                                />
                            </div>
                        ))
                    }
                </div>
           
            
        </div>
     <div className='flex mx-40 border-4 bg-image border-white  rounded mt-12  p-4'>
             
         
                <div>
                    <div>
                        <h1 className='absolute -my-12 -mx-5 text-red-500 font-bold'>IMDB TOP 10</h1>
                    </div>
                    <div>
                        <h1 className='absolute right-0 mx-40 -my-12  text-orange-600 font-bold cursor-pointer' onClick={() => navigate(`/top-rated-movies`)}>Tümünü Gör</h1>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        items2.map((x) => (
                            <div key={x.key}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                                    className="cursor-pointer rounded w-100 brightness-100 hover:scale-105 transform transition duration-300"
                                    onClick={() => navigate(`/${x.id}/movie-details`)}
                                    alt={x.title}
                                />
                            </div>
                        ))
                    }
                </div>
           
            
        </div>
        <div className='flex mx-40 border-4 bg-image border-white  rounded mt-12  p-4'>
            
                <div>
                    <div>
                        <h1 className='absolute -my-12 -mx-5 text-red-500 font-bold'>VİZYONA GİRECEK FİLMLER</h1>
                    </div>
                    <div>
                        <h1 className='absolute right-0 mx-40 -my-12  text-orange-600 font-bold cursor-pointer' onClick={() => navigate(`/upcoming-movies`)}>Tümünü Gör</h1>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        items3.map((x) => (
                            <div key={x.key}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                                    className="cursor-pointer rounded w-100 brightness-100 hover:scale-105 transform transition duration-300"
                                    onClick={() => navigate(`/${x.id}/movie-details`)}
                                    alt={x.title}
                                />
                            </div>
                        ))
                    }
                </div>
          
            
        </div>
        <div className='flex mx-40 border-4 bg-image border-white  rounded mt-12 mb-4 p-4'>
            
                <div>
                    <div>
                        <h1 className='absolute -my-12 -mx-5 text-red-500 font-bold'>TOP 10 TV SHOWS</h1>
                    </div>
                    <div>
                        <h1 className='absolute right-0 mx-40 -my-12  text-orange-600 font-bold cursor-pointer' onClick={() => navigate(`/top-rated-series`)}>Tümünü Gör</h1>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        items4.map((x) => (
                            <div key={x.key}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                                    className="cursor-pointer rounded w-100 brightness-100 hover:scale-105 transform transition duration-300"
                                    onClick={() => navigate(`/${x.id}/series-details/`)}
                                    alt={x.title}
                                />
                            </div>
                        ))
                    }
                </div>
          
            
        </div>
        
    </div>
    )
}

export default Home;
