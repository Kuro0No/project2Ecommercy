import React, { useRef, useState, useEffect } from 'react';
import './BannerVideoHome.scss'
import Banner from './Video/1.mp4'
import { Link, useLocation } from 'react-router-dom';
// import VideoCenter from './Video/VideoCenter.webm'
import VideoCenter2 from './Video/videoCenter2.mp4'
import productBanner from '../../img/productBanner.png'
import '../../responsive/responsiveHome.scss'
import Menu from '../Menu/Menu';
import Aos from 'aos';
import 'aos/dist/aos.css'




const BannerVideoHome = () => {

    const [abouteRef, setAboutRef] = useState()
    const [productRef, setProductRef] = useState()



    return <>
        <Menu abouteRef={abouteRef} productRef={productRef} />

        <div id='banner-wrapper' >
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
            <NewLists setAboutRef={setAboutRef} />
            <Product setProductRef={setProductRef} />

        </div>
    </>
};

const NewLists = ({ setAboutRef }) => {
    const ref = useRef()
    const [fontSizeConcepText, setfontSizeConcepText] = useState(40)
    useEffect(() =>
        ref && setAboutRef(ref.current)
        , [])

    useEffect(() => {
        Aos.init({ duration: 1500 })

    }, [])
    useEffect(() => {
        const resizeHandle = () => {
            window.innerWidth < 542 && setfontSizeConcepText(window.innerWidth / 14)

        }
        window.addEventListener('resize', resizeHandle)

        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])
    
    const videoRef = useRef()
    

    return (
        <div className='new-list-container' id='about' ref={ref}>
            {/* <Link className='news-list-link' to='news'> NEW LIST </Link> */}
            <div className='p-index-container'>
                <div className='p-index-about'>
                    <img data-aos="fade-left" style={{ width: "100%" }} className='animation-img' src='https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-nu-dep-nhat-the-gioi_113857663.jpg' />
                    <div data-aos="fade-up" className='p-index-about-description text-center'>
                        <h3 >ABOUT PRODUCT</h3>
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
                <div className='p-index-concept ' >
                    <img className='concept-img' data-aos="fade-up" src='https://media-cldnry.s-nbcnews.com/image/upload/newscms/2021_23/3482366/210611-gender-fluid-clothing-2x1-cs.jpg' />
                    <div data-aos="zoom-in-down" className='concept-text-div'>
                        <h1 className='concept-text text-center' style={{ fontSize: fontSizeConcepText }} >BEST <br /> & CLOTHING</h1>

                    </div>

                </div>
                <div className='concept-text-story'>
                    <div data-aos="fade-down-left" className='concept-story-desc text-center'>
                        <div >
                            <h1 >UNEARTHING THE SECRET </h1>
                            <h1>OF GREAT SHOP</h1>

                        </div>
                        <p>We gave the sweet potato</p>
                        <p>a good study and found the answer to a</p>
                        <p>great-tasting sweet potato snack.</p>
                    </div>
                    <div className='concept-story-gif'>
                        <div className='gif-right'>
                            <img data-aos="fade-up-left" src="https://cdn.dribbble.com/users/1976516/screenshots/8813235/media/d2727d138f75c89e6ca1ef2d56de9a99.gif" alt="" />
                        </div>
                        <div className='gif-left'>
                            <img data-aos="fade-up-right" src="https://cdn.dribbble.com/users/1019864/screenshots/9189989/blue_dribbble.gif" alt="" />
                        </div>
                        <div className='video-center'>
                            <video  controls data-aos="zoom-in" ref={videoRef} src={VideoCenter2}  ></video>

                            {/* <i  ref={playRef}  className='bi bi-play play-video-home'></i> */}
                        </div>
                        <div className='gif-left-bottom'>
                            <img data-aos="zoom-in-left" src="https://media4.giphy.com/media/3oipPTHYlTpCw8oBBy/giphy.gif" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Product = ({ setProductRef }) => {
    const circle1Ref = useRef()
    const circle2Ref = useRef()
    const circle3Ref = useRef()
    const circle4Ref = useRef()
    const [hat, setHat] = useState('HAT')
    const [trousers, setTrousers] = useState('TROUSERS')
    const [shoes, setShoes] = useState('SHOES')
    const [jacket, setJacket] = useState('JACKET')
    const [size, setSize] = useState(Math.round(window.innerWidth / 30))
    const [witdh, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        witdh > 1024 && setSize(28)
    })

    const CircleMove1 = () => {
        setHat(undefined)
        circle1Ref.current.src = 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/3739ae6f20f04fefa5c5aa1701065db9_9366/Mu_len_tron_vanh_gan_soc_Adicolor_DJo_ED8726_01_standard.jpg'
        circle1Ref.current.style.scale = 1.5
    }
    const MouseCircleLeave = () => {
        circle1Ref.current.src = ''
        setHat('HAT')


    }
    const CircleMove2 = () => {
        setJacket(undefined)
        circle2Ref.current.src = 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2021/01/ao-khoac-men-s-lacoste-sport-contrast-accents-print-zip-sweatshirt-mau-xanh-la-ten-tren-website-600572d1c5b38-18012021183649.jpg'
        circle2Ref.current.style.scale = 1.5
    }
    const MouseCircleLeave2 = () => {
        circle2Ref.current.src = ''
        setJacket('JACKET')


    }
    const CircleMove3 = () => {
        setShoes(undefined)
        circle3Ref.current.src = 'https://bizweb.dktcdn.net/thumb/1024x1024/100/347/064/products/air-force-1-shadow-shoe-m8sqjm-839b03fe-6f28-48bd-ab6d-2e3ad2209713.jpg?v=1603421356143'
        circle3Ref.current.style.scale = 1.5
    }
    const MouseCircleLeave3 = () => {
        circle3Ref.current.src = ''
        setShoes('SHOES')


    }
    const CircleMove4 = () => {
        setTrousers(undefined)
        circle4Ref.current.src = 'https://saigonsneaker.com/wp-content/uploads/2020/11/Quan-Baggy-Jean-Nam-Ong-Rong-Xanh-8.jpg'
        circle4Ref.current.style.scale = 1.5
    }
    const MouseCircleLeave4 = () => {
        circle4Ref.current.src = ''
        setTrousers('TROUSERS')
    }
    const mouseMoveShop = useRef()
    const mouseMoveContact = useRef()
    const mouseMoveShopHandle = (e) => {
        mouseMoveShop.current.style.left = e.clientX + 'px'
        mouseMoveShop.current.style.top = e.clientY + 'px'
        mouseMoveShop.current.style.width = '80px'
        mouseMoveShop.current.style.height = '80px'
        mouseMoveShop.current.style.border = 'white solid 2px'


    }
    const mouseLeaveShopHandle = () => {
        mouseMoveShop.current.style.width = 0
        mouseMoveShop.current.style.height = 0
        mouseMoveShop.current.style.border = 'none'

    }
    const mouseMoveContactHandle = (e) => {
        mouseMoveContact.current.style.left = e.clientX + 'px'
        mouseMoveContact.current.style.top = e.clientY + 'px'
        mouseMoveContact.current.style.width = '80px'
        mouseMoveContact.current.style.height = '80px'
        mouseMoveContact.current.style.border = '#ce009f solid 2px'

    }
    const mouseLeaveContactHandle = () => {
        mouseMoveContact.current.style.width = 0
        mouseMoveContact.current.style.height = 0
        mouseMoveContact.current.style.border = 'none'

    }
    useEffect(() => {
        const resizeHandle = () => {
            setWidth(window.innerWidth)
            setSize(Math.round(window.innerWidth / 30))

        }
        window.addEventListener('resize', resizeHandle)

        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])
    const productRef = useRef()
    useEffect(() => {
        setProductRef(productRef.current)
    })





    return (
        <>
            <div className='text-center p-index-product' ref={productRef}>

                <h1 data-aos="zoom-in" className='mb-5'>CLOTHING</h1>
                <div data-aos="zoom-in" className='product-introduce mb-5' >
                    <h3>1 Product: 20$ <label>(Tax included)</label></h3>
                    <h3>4 Product: 80$ <label>(Tax included)</label></h3>
                </div >
                <div className='banner-product'>
                    <img data-aos="zoom-in-up" src="https://static.onecms.io/wp-content/uploads/sites/23/2019/02/27/athleisure-work-clothes_0-2000.jpg" alt="" />
                </div>
                <div className=' p-index-product-desc-feature'>
                    <div className='p-index-product-desc-div'>
                        <div className='p-index-product-desc col-6' data-aos="zoom-up">
                            <h3 className="p-index-product-desc-title">Three different textures</h3>
                            <p className="p-index-product-desc-text" >POGG packs three different textures in one bite - A crispy pie crust that wraps fluffy sweet potato paste and velvety sweet potato cream.</p>
                            <h3 className="p-index-product-desc-title">A carefully designed shape</h3>
                            <p className="p-index-product-desc-text">We designed POGG’s sweet potato pies in a unique shape of a triangle so that it will encompass all three different textures together and surprise people with their image of a sweet potato.</p>
                            <strong className="p-index-product-desc-allergy">[Allergens] Clothes, Trousers, Shoes,...</strong>
                        </div>
                    </div>

                    <div data-aos="flip-up" className='product-feature'>
                        <img src={productBanner} />
                        <div className="circle-multiple">
                            <div className="circle text-center " onMouseMove={CircleMove1} onMouseLeave={MouseCircleLeave} >
                                <span style={{ fontSize: size }}>{hat}</span>
                                <img ref={circle1Ref} />
                            </div>
                        </div>
                        <div className="circle-multiple2" onMouseMove={CircleMove2} onMouseLeave={MouseCircleLeave2}>
                            <div className="circle text-center">
                                <span style={{ fontSize: size }}>{jacket}</span>
                                <img ref={circle2Ref} />
                            </div>
                        </div>
                        <div className="circle-multiple3">
                            <div className="circle text-center" onMouseMove={CircleMove3} onMouseLeave={MouseCircleLeave3}>
                                <span style={{ fontSize: size }}>{shoes}</span>
                                <img ref={circle3Ref} />
                            </div>
                        </div>
                        <div className="circle-multiple4" onMouseMove={CircleMove4} onMouseLeave={MouseCircleLeave4}>
                            <div className="circle text-center">
                                <span style={{ fontSize: size }}>{trousers}</span>
                                <img ref={circle4Ref} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='p-index-product-sub-image'>
                    <img data-aos="fade-left" src="https://thumbnails.cbc.ca/maven_legacy/thumbnails/2/995/CBC_MARKETPLACE_S49E01_thumbnail_v01.jpeg" alt="" />
                </div>

                <div className='p-index-product-sub-image-2'>
                    <img data-aos="fade-right" src="https://media1.giphy.com/media/8cphEsRKEFSVlwtOA0/giphy.gif" alt="" />
                </div>
                <div className='p-index-shop-container '>
                    <div className=' p-index-shop-left' onMouseMove={mouseMoveShopHandle} onMouseLeave={mouseLeaveShopHandle}>
                        <div id='mouseMoveShop' ref={mouseMoveShop}></div>
                        <Link to='/product' onClick={() => window.scrollTo(0, 0)}>
                            <h3>Buy Now!</h3>
                            <p>Many hot products are waiting for you <i className="bi bi-cart"></i></p>
                        </Link>
                    </div>
                    <div className='  p-index-contact-right' onMouseMove={mouseMoveContactHandle} onMouseLeave={mouseLeaveContactHandle}>
                        <div id='mouseMoveContact' ref={mouseMoveContact}></div>
                        <Link to='/contact' onClick={() => window.scrollTo(0, 0)}>
                            <h3>Contact Now!</h3>
                            <p>Contact me for more details <i className="bi bi-telephone"></i></p>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}


export default BannerVideoHome;
