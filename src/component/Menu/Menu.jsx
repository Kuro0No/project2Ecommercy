import React, { useEffect, useRef } from 'react';
import { useState } from 'react/cjs/react.development';
import './Menu.scss'

const Menu = () => {
    const menuContainerRef = useRef()
    const [active, setActive] = useState(false)
    const [menuText, setMenuText] = useState(true)
    useEffect(() => {
        const handleScrollMenu = () => {
            if (window.scrollY >= 100) {
                menuContainerRef.current.style.width = '410px'
                menuContainerRef.current.style.height = '200px'


            } else {
                menuContainerRef.current.style.width = '600px'
                menuContainerRef.current.style.height = '230px'
            }
        }
        window.addEventListener('scroll', handleScrollMenu)
    }, [])
    const handleShowMenu = () => {
        setActive(true)
        setMenuText(false)

    }
    const handleCancleMenu = () => {

        setActive(false)
    }



    return <div className={`menu-container ${active ? 'active' : ''}`} ref={menuContainerRef}>
        <div className='menu justify-content-center' onClick={handleShowMenu}>


            <span> {menuText && 'MENU'}</span>
            <div className={`${active ? 'active-timeX' : ''}`}>
                {active ? <i className='bi bi-x-lg' onClick={handleCancleMenu}></i> : <i className='bi bi-list'></i>}
            </div>


        </div>
    </div>;
};

export default Menu;
