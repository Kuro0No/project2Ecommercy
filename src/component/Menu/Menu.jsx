import React, { useEffect, useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import './Menu.scss'
import { Link } from 'react-router-dom'
import '../../responsive/responsiveMenu.scss'


const Menu = () => {
    const menuShowRef = useRef()
    const [active, setActive] = useState(false)
    const [menuText, setMenuText] = useState(true)
   

    useEffect(() => {
        const handleScrollMenu = () => {
            if (window.scrollY >= 100) {
                menuShowRef.current.style.width = '210px'
                menuShowRef.current.style.height = '100px'        
            }
            else {
                menuShowRef.current.style.width = '300px'
                menuShowRef.current.style.height = '150px'
               
            }
        }
        window.addEventListener('scroll', handleScrollMenu) 
        return  () => {
            window.removeEventListener('scroll', handleScrollMenu)
        }
    }, [])
    const handleShowMenu = () => {
        setActive(true)
        setMenuText(false)
        
    }
    const handleCancleMenu = () => {
        setActive(false)
        setMenuText(true)
    }
    const mousemoveRef = useRef()
    const menuMouseMove =(e) => {
        mousemoveRef.current.style.left= e.clientX + 'px'
        mousemoveRef.current.style.top= e.clientY + 'px'
        mousemoveRef.current.style.width= '20px'
        mousemoveRef.current.style.height= '20px'
    }
    const menuMouseLeave =() => {
        mousemoveRef.current.style.width= 0
        mousemoveRef.current.style.height= 0
    }
    
    

    return <div className='menu-container'>


        <div className={`menu-show ${active ? 'active' : ''}`} ref={menuShowRef} onMouseMove={menuMouseMove} onMouseLeave={menuMouseLeave} >
        <div className='mouse-move' ref={mousemoveRef}></div>
            <div className='menu justify-content-center' onClick={active ? handleCancleMenu : handleShowMenu}>


                <span> {menuText && 'MENU'}</span>
                <div className={`${active ? 'active-timeX' : ''}`}>
                    {active ? <i className='bi bi-x-lg' onClick={handleCancleMenu}></i> : <i className='bi bi-list'></i>}
                </div>


            </div>
            {active &&
                <div className='menu-container-contents ' >
                    <ul>
                        <li>
                            <Link to=''>TOP</Link>
                        </li>
                        <li>
                            <Link to='' >- ABOUT PRODUCT</Link>
                        </li>
                        <li>
                            <Link to=''>- PRODUCT</Link>
                        </li>
                        <li>
                            <Link to=''>NEWS</Link>
                        </li>
                        <li>
                            <Link to=''>SHOP</Link>
                        </li>
                        <li>
                            <Link to=''>CONTACT</Link>
                        </li>

                    </ul>
                </div>
            }
        </div>
    </div>
};

export default Menu;
