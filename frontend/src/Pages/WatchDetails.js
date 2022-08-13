import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Button from "../Components/Button"
import Loading from "../Components/Loading"
import ShowSeasons from "../Components/ShowSeasons/ShowSeasons"
import Meta from "../Components/Meta"
import StarRating from '../Components/StarRating'
import SliderActor from "../Components/SliderActor"
import styled from "styled-components"
import { poster300, posterCastNotAvailable, posterNotAvailableLandscape } from "../utils/contants"
import { getMovieDetails } from '../utils/apis'

const DetailsStyle = styled.div`
    .detail-info {
        display: flex;
        position: relative;

        .img-poster {
            width: 100%;
            filter: blur(8px);
            -webkit-filter: blur(8px);
            height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            object-fit: cover;
        }

        .banner-info {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        .text-color {
            color: #ec4d37;
        }
    }

    .actor {
        margin: 0 50px;

        .actor-title {
            color: #fff;
        }

        .slide-actor {
            display: flex;
        }
    }
`

const BannerImg = styled.div`
    .banner-img {
        border-radius: 10px;
        bottom: 0;
    }
`

const WatchDetails = () => {
    const params = useParams()
    const [data, setData] = useState()
    const [casts, setCasts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const resultsMovieDetails = () => {
            getMovieDetails(params.media_type, params.id)
            .then(
                res => {
                    setData(res.data)
                    setCasts(res.casts)
                    setLoading(false)
                }
            )
            .catch(err => console.log(err))
        }

        resultsMovieDetails()
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [params.media_type, params.id, loading])

    return (
        <>
            <Meta title={data?.title || data?.name} />
            {
                loading === true ?
                <Loading typeLoad='Plane' position='center' /> :
                <>
                    <DetailsStyle>
                        <div className="detail-info">
                            <img
                                src={data.backdrop_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : posterNotAvailableLandscape}
                                alt="banner"
                                className="img-poster"
                            />
                                        
                            <div className="banner-info container d-flex">
                                <BannerImg>
                                    <img
                                        src={data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : null}
                                        alt="poster"
                                        className="banner-img"
                                    />
                                </BannerImg>
                                <div className=" text-light ms-4 me-5">
                                    <div>
                                        <Link to={params.media_type === 'movie' ? `/${params.media_type}/${params.id}` : `/${params.media_type}/${params.id}/season=1/episode=1`}>
                                            <Button name='Play Now' />
                                        </Link>
                                    </div>
                                    <div className="fs-1 fw-bold text-color">{data.title || data.name}</div>
                                    <div className="fst-italic fs-6 text-color">{data.tagline}</div>
                                    <div className="fs-4 text-color">{data.overview}</div>
                                    <div className="fs-5 fst-italic text-color">Release Date: {data.release_date || data.first_air_date}</div>
                                    <div className="text-color">Vote: {data.vote_average}</div>
                                    <StarRating 
                                        stars={Math.round(data.vote_average)}
                                        extraText={`(${data.vote_count} votes)`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="actor">
                            <h4 className="actor-title">Actor</h4>
                            {
                                casts.length < +(10) ?                               
                                <div className="slide-actor">
                                    {
                                        casts.map(cast => {
                                            return (
                                                <div key={cast.id}>
                                                    <img 
                                                        src={cast.profile_path ? `${poster300}/${cast.profile_path}` : posterCastNotAvailable }
                                                        alt='img_actor'
                                                        className='px-2 rounded w-100'
                                                    />
                                                    <p className='text-white text-center'>{cast.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                 : 
                                <SliderActor casts={casts} />
                            }
                        </div>
                        {
                            params.media_type === 'tv' ?
                            <ShowSeasons data={data.seasons} id={params.id} /> :
                            null
                        }
                    </DetailsStyle>
                </>
            }
        </>
    );
}

export default WatchDetails
