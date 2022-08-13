import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import CardSlide from '../Components/CardSlide'
import CustomPagination from '../Components/CustomPagination'
import Loading from '../Components/Loading'
import Meta from '../Components/Meta'
import styled from 'styled-components'
import http from '../utils/http'
// import { getDataMovies } from '../utils/apis'

const MainPage = styled.div`
    display: flex;

    .main-container {
        margin-top: 80px;
    }
`

const Movies = () => {
    const [moviesData, setMoviesData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMoviesData = async () => {
            const dataMoviesFetch = await http.get('/discover/movie', {
                params: {
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                    include_adult: false,
                    include_video: false,
                    page: page
                }
            })
            setMoviesData(dataMoviesFetch.data.results)
            setLoading(false)
        }
        fetchMoviesData()
        window.scroll(0, 0)
    },[page])

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    })

    return (
        <>
            <Meta title='Movies'/>
            {
                loading === true ?
                <Loading typeLoad='Plane' position='center' /> :
                <>
                    <MainPage>
                        <div className='main-container container'>
                            <Row xs={2} sm={3} md={4} lg={5}>
                                {moviesData.map(data => {
                                    return (
                                        <Col key={data.id} sm>
                                            <CardSlide 
                                                id={data.id}
                                                media_type='movie'
                                                title={data.title}
                                                poster_path={data.poster_path}
                                                // handleDetails={props.handleDetails}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                            <CustomPagination setPage={setPage} />
                        </div>
                    </MainPage>
                </>
            }
        </>
        
    )
}

export default Movies
