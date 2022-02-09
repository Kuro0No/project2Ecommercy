import React, { useState } from 'react'
import custommerSupport from '../../img/custommerSupport.png'
import './Contact.scss'
import { EmailChoChungToi, Hotrotructuyen, Thongtinlienhe } from './CustomerSuport'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';





const Contact = () => {
    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [activeId, setActiveId] = useState('')
    document.title = "Liên hệ"

    return (
        <div>
            <div className=' contactbanner'>
                <div><img src={custommerSupport} /></div>

            </div>
            <h2 className='text-center'>Support</h2>
            <div className='mt-0  mx-auto container  row  row-cols-1 row-cols-1 row-cols-md-4 g-4'>
                <Link onClick={() => { setActiveId('active'); setActive1(true); setActive2(false); setActive3(false) }} className="card col-md-4 tabContact border-dark mb-3" to=''  >

                    <i className="bi bi-person-workspace text-center p-0"></i>
                    <div className="card-body text-dark">
                        <h5 className="text-center card-title">Contact info</h5>
                        <p className="text-center card-text">Information related to me </p>
                    </div>
                </Link>
                <Link onClick={() => { setActiveId('active'); setActive1(false); setActive2(true); setActive3(false); }} className="card col-md-4 tabContact border-dark mb-3" to=''  >

                    <i className="text-center bi bi-envelope p-0"></i>

                    <div className="text-center card-body text-dark">
                        <h5 className="card-title">Send Email to me</h5>
                        <p className="text-center card-text">Please, send Email to me for feedback & advice. </p>
                    </div>
                </Link>
                <Link onClick={() => { setActiveId('active'); setActive1(false); setActive2(false); setActive3(true) }} className="card col-md-4 tabContact border-dark mb-3" to=''>

                    <i className="bi bi-chat-right-text text-center"></i>
                    <div className="text-center card-body text-dark">
                        <h5 className="card-title">Online support</h5>
                        <p className="text-center card-text">Ready to advise or answer all your questions. </p>
                    </div>
                </Link>
            </div>
            <ToastContainer />

            {active1 && <Thongtinlienhe activeId={activeId} />}
            {active2 && <EmailChoChungToi activeId={activeId} />}
            {active3 && <Hotrotructuyen activeId={activeId} />}

        </div >
    )
}

export default Contact