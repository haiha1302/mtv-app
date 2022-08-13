import { useState, useEffect } from 'react'
import http from '../utils/http'
import { Row, Col } from 'react-bootstrap'
import CardSlide from '../Components/CardSlide'
import CustomPagination from '../Components/CustomPagination'
import styled from 'styled-components'
import Loading from '../Components/Loading'
import Meta from '../Components/Meta'

const MainPage = styled.div`
    display: flex;

    .main-container {
        margin-top: 80px;
    }
`

const TVSeries = () => {
    const [tvseriesData, setTvseriesData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTVSeriesData = async () => {
            const dataTvseriesFetch = await http.get('/discover/tv', {
                params: {
                    language: 'en-US',
                    sort_by: 'popularity.desc',
                    include_adult: false,
                    include_video: false,
                    page: page
                }
            })
            setTvseriesData(dataTvseriesFetch.data.results)
        }
        fetchTVSeriesData()
        setLoading(false)
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [page])

    return (
        <>
            <Meta title='TV Series'/>
            {
                loading === true ?
                <Loading typeLoad='Plane' position='center' /> :
                <>
                    <MainPage>
                        <div className='main-container container'>
                            <Row xs={2} sm={3} md={4} lg={5}>
                                {tvseriesData.map(data => {
                                    return (
                                        <Col key={data.id} sm>
                                            <CardSlide 
                                                id={data.id}
                                                media_type='tv'
                                                title={data.name}
                                                poster_path={data.poster_path}
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

export default TVSeries
