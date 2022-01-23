import React, { useRef } from 'react';
import './BannerVideoHome.scss'
import Banner from './Video/1.mp4'
import { Link } from 'react-router-dom';
import VideoCenter from './Video/VideoCenter.webm'


const BannerVideoHome = () => {

    return <div id='banner-wrapper'>
        <div className='banner-container'>
            <div className='p-top'>
                Share -----
                <p>Twitter</p> / <p>Facebook</p>
            </div>
            <div className='video-pText '>
                <div className='p-left '>
                    {/* <div className='border-news'></div> */}
                    <p className='p-text-left'>
                        Recent
                    </p>
                    <div className='border-left'></div>



                </div>
                <video autoPlay loop muted src={Banner} ></video>
                <div className='p-right'>
                    <p className='p-text-right'> <label>Scroll</label> </p>
                    <div className='scroll-clip'></div>


                </div>
            </div>

        </div>
        <NewLists />
        <Product />
    </div>;
};

const NewLists = () => {


    return (
        <div className='new-list-container'>
            <Link className='news-list-link' to='news'> NEW LIST </Link>
            <div className='p-index-container'>
                <div className='p-index-about'>
                    <img style={{ width: "100%" }} className='animation-img' src='https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-nu-dep-nhat-the-gioi_113857663.jpg' />
                    <div className='p-index-about-description text-center'>
                        <h3 >ABOUT POGG</h3>
                        <h1> A SMART CHOICE </h1>
                        <h2> Crispy, Fluffy and Creamy in one little triangle!</h2>
                        <div>
                            <p>POGG packs crispy, fluffy and creamy</p>
                            <p>textures all into one irresistible bite</p>
                            <p>that no other sweet potato snack</p>
                            <p>will ever come close.</p>
                        </div>

                    </div>
                </div>
                <div className='p-index-concept '>
                    <img className='concept-img' src='https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_23/3482366/210611-gender-fluid-clothing-2x1-cs.jpg' />
                    <div className='concept-text-div'>
                        <h1 className='concept-text text-center' >BEST <br /> & CLOTHING</h1>

                    </div>

                </div>
                <div className='concept-text-story'>
                    <div className='concept-story-desc text-center'>
                        <div>
                            <h1 >UNEARTHING THE SECRET </h1>
                            <h1>OF GREAT SHOP</h1>

                        </div>
                        <p>We gave the sweet potato</p>
                        <p>a good study and found the answer to a</p>
                        <p>great-tasting sweet potato snack.</p>
                    </div>
                    <div className='concept-story-gif'>
                        <div className='gif-right'>
                            <img src="https://cdn.dribbble.com/users/1976516/screenshots/8813235/media/d2727d138f75c89e6ca1ef2d56de9a99.gif" alt="" />
                        </div>
                        <div className='gif-left'>
                            <img src="https://cdn.dribbble.com/users/1019864/screenshots/9189989/blue_dribbble.gif" alt="" />
                        </div>
                        <div className='video-center'>
                            <video src={VideoCenter}></video>
                        </div>
                        <div className='gif-left-bottom'>
                            <img src="https://media4.giphy.com/media/3oipPTHYlTpCw8oBBy/giphy.gif" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Product = () => {


    return (
        <>
        <div className='text-center'>
            
            <h1>CLOTHING</h1>
            <div className='product-introduce'>
                <h3>1 Product: 20$</h3>
                <h3>4 Product: 80$</h3>
            </div>
        </div>
        </>
    )
}


export default BannerVideoHome;
