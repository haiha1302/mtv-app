import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { poster300, posterCastNotAvailable } from '../utils/contants'
import styled from 'styled-components';

SwiperCore.use([Navigation, Autoplay]);

const SlideActorStyle = styled.div`
    .img-actor {
        width: 100%;
        border-radius: 10px;    
        margin-bottom: 5px;
    }

    .name-actor {
        text-align: center;
        color: #fff;
    }
`

const SliderActor = props => {
    return (
        <SlideActorStyle>
            <Swiper 
                navigation={true} 
                slidesPerView={2}
                className="mySwiper"
                loop={true}
                breakpoints={{
                    '500': {
                        'slidesPerView': 3,
                    },
                    '800': {
                        'slidesPerView': 4,
                    },
                    '1000': {
                        'slidesPerView': 5,
                    },
                    '1200': {
                        'slidesPerView': 10,
                    }
                }}
            >
            {
                props.casts.map(cast => {
                    return (
                        <SwiperSlide key={cast.id}>
                            <img 
                                src={cast.profile_path ? `${poster300}/${cast.profile_path}` : posterCastNotAvailable }
                                alt='img_actor'
                                className='px-2 rounded img-actor'
                            />
                            <p className='name-actor'>{cast.name}</p>
                        </SwiperSlide>
                    )
                })
            }
            </Swiper>
        </SlideActorStyle>
    )
}

export default SliderActor
