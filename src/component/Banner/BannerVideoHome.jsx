import React, { useRef } from 'react';
import './BannerVideoHome.scss'
import Banner from './Video/1.mp4'

const BannerVideoHome = () => {

    return <div id='banner-wrapper'>
        <div className='banner-container'>
            <div className='p-top'>
                Share -----
                <p>Twitter</p> / <p>Facebook</p>
            </div>
            <div className='video-pText '>
                <div className='p-left'>
                    <p> Recent News </p>
                </div>
                <video  autoPlay loop muted src={Banner} ></video> 
                <div className='p-right'>
                    <p> Scroll </p>
                </div>
            </div>
        </div>
    </div>;
};

export default BannerVideoHome;
