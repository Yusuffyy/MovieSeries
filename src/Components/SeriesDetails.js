import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeriesDetails = () => {
    const [poster, setPoster] = useState("https://image.tmdb.org/t/p/w500");
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [mincaster , setMincaster] = useState(0)
    const [maxcaster, setMaxcaster] = useState(10)
    const [item2, setItem2] = useState({});
    const [item3, setItem3] = useState({});
    const navigate = useNavigate();
    const API_KEY=process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?language=tr-TR&api_key=${API_KEY}`);
                setItem(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${API_KEY}`);
                setItem3(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetch();
        }, [id])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?language=tr-TR&api_key=${API_KEY}`);
                setItem2(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetch();
        }, [id])

        const handleCaster = () => {
            if (maxcaster < item2.cast.length) {
                setMincaster(mincaster + 1);
                setMaxcaster(maxcaster + 1);
            }
        };
        const handleCaster2 = (e) => {
            e.preventDefault();
            
            // Min ve Max sınırlarını kontrol etmek önemlidir.
            if (mincaster > 0) {
                setMincaster(mincaster - 1);
                setMaxcaster(maxcaster - 1);
            }
        }
    return (
        <div
            className="relative"
            style={{
                height: '100%',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
               
            }}
        >
           
           <div
    className="absolute inset-0 bg-black opacity-60" 
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.8)' ,
      height: '100%',
    }}
  ></div>
         
                <div className="flex gap-2  text-white brightness-200 justify-center py-12" >   
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="rounded w-100 h-96 brightness-50" alt={item.title} />
                        <div className='flex justify-center gap-4 py-4 mx-7'>
            
                             <div className=''>
                                <h1 className='text-white font-bold'>Oy Sayısı</h1>
                                <div className='flex gap-1'>
                                <h1 className='text-white'>{item.vote_count}</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>

                                
                                </div>
                            </div>
                            <div className=''>
                                <h1 className='text-white font-bold'>Puan</h1>
                                <div className='flex'>
                                <h1 className={item.vote_average >= 7 ? 'text-green-500' : item.vote_average >= 5 ? 'text-yellow-500' : 'text-red-500'}>
                                    {item.vote_average}
                                </h1>
                                <h1> /10</h1>
                                </div>
                               
                            </div>
                            
                         </div>
                        
                    </div>
                    <div className='flex p-2 w-3/5 mx-10' >
                        <div className='text-white '>
                            <h1 className="text-3xl font-extrabold ">{item.name}</h1>
                            <h1 className="text-lg ">{item.first_air_date} / {item.last_air_date}</h1>
                            <div className="flex">
                                <h4 className="py-1 font-bold">(</h4>
                                {item.genres && item.genres.map((genre, index) => (
                                    <React.Fragment key={genre.id}>
                                        <h4 className="py-1 font-bold">{genre.name}</h4>
                                        {index !== item.genres.length - 1 && <h4 className="py-1 px-1">,</h4>}
                                    </React.Fragment>
                                ))}
                                <h4 className="py-1 font-bold">)</h4>
                            </div>
                            <h1 className='text-amber-400 font-extrabold py-2'>{item.tagline}</h1>
                            <div className="flex flex-wrap py-2 ">
                                <h1 className="text-3xl font-bold">Özet</h1>
                            </div>
                           
                            <div>
                                <h2 className='font-semibold'>{item.overview}</h2>
                            </div>
                            <div className='grid grid-cols-2 items-center py-10 gap-4'>
                                    {item3.results && item3.results
                                    .filter(video => video.official === true ) // Sadece fragman türündeki videoları filtrele
                                    .slice(0, 1) // Sadece ilk fragmanı al
                                    .map((a) => (
                                        <div className="flex items-center ">
                                            <iframe
                                                width="560"
                                                height="315"
                                                src={`https://www.youtube.com/embed/${a.key}`}
                                                title="YouTube video player"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                allowfullscreen
                                            ></iframe>
                                        </div>
                                    ))}
                            </div>
                            <div className='flex py-2'>
                            <span className='font-bold'>YAZAR: </span>
                               {item.created_by && item.created_by.map(y => 
                                    <h2 className="px-1" key={y.id}> {y.name}</h2>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex flex-cols 1 justify-center w-52 mt-2 h-64'>
                        <div className="flex h-52">
                            <div className=''>
                            <div className='py-2'>
                                    <h1 className='text-white font-bold'>Orjinal Başlık</h1>
                                    <p>{item.original_name}</p>
                                </div>
                                <div className='py-2'>
                                    <h1 className='text-white font-bold'>Durum</h1>
                                    <p>{item.status}</p>
                                </div>
                                <div className='py-2'>
                                 <h1 className='text-white font-bold'>Sezon Sayısı</h1>
                                     <div>
                                         <p>{item.number_of_seasons} </p>      
                                     </div>
                                     </div>
                                <div className='py-2'>
                                <div className="text-white font-bold"> Bölüm Sayısı </div>
                                <p>{item.number_of_episodes} </p>   
                                </div>
                                   
                    
                                <div className='w-20 py-10 gap-2'>
                         <div>
                     {item.production_companies && item.production_companies.map(prod => (
                         <div key={prod.id}>
                          {prod.logo_path && <img src={`https://image.tmdb.org/t/p/w200${prod.logo_path}`} alt={`Logo for ${prod.name}`} />}
                         </div>
                             ))}
                        </div>  
                         </div>
                            </div>
                        </div>
                    </div>
                </div>    
                <div className=" max-w-screen-2xl flex gap-6 mx-auto brightness-75 rounded-lg p-4">
        <div className='flex items-center bg-white rounded-lg cursor-pointer' onClick={handleCaster2} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>

            </div>
            {item2.cast &&
  item2.cast.slice(mincaster, maxcaster).map((b, index) => (
    <div
      key={b.id}
      className="{`image-transition ${index === mincaster ? 'active' : ''} w-60 hover:transform transition duration-300 hover:scale-105 cursor-pointer rounded hover: shadow-2xl `} shadow-md bg-white rounded"  onClick={() => navigate(`/${b.id}/person-details`)}
    >
      {b.profile_path !== null ? (
        <img src={`${poster}${b.profile_path}`} className="rounded border-2 bg-white brightness-100" alt={b.name} />
      ) : (
        <img src={require("./Img/unknown-person-icon-Image-from.png")} className="rounded border-2 bg-white brightness-100 text-white h-44" alt="Profil Resmi Yok" />
      )}
      <div className="py-2">
      <p className=" font-bold text-center text-sm">{b.character}</p>
        <p className="hover:text-red-500 text-xs text-yellow-300 text-center">({b.name})</p>
      </div>
    </div>
  ))
}
       <div className='flex items-center bg-white rounded-lg cursor-pointer' onClick={handleCaster}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

            </div>
                </div>
             <div>
                
             </div>
        </div>
    );
};

export default SeriesDetails;