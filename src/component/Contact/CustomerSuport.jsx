import map from '../../img/map.jpg'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


export const Thongtinlienhe = ({ activeId }) => {

    return (
        <div id={activeId}>
            <h2 className=' title-main container text-center d-block mx-auto '>Headquarters </h2>
            <div className="mx-auto container card mb-3 border-0" >
                <div className="row g-0">
                    <div className="col-md-4">
                        <div>
                            <h6 >Headquarters </h6>
                            <p>Phu Ly city, Ha Nam district</p>
                        </div>
                        <img src={map} className=" img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8 ps-5">
                        <div className="card-body pt-0 ">
                            <div>
                                <h5 className="card-title ">Support</h5>

                            </div>

                            <p className="card-text ">Contact to me so i can advise you directly on the products and services you are interested in. I are always happy to listen and support you!. </p>

                            <div className='cursorPointer'>
                                <Link to='' className='d-flex'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-telephone " viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                    <div className='ps-4'>(+84) 132456798</div>
                                </Link>
                                <Link to="" className='d-flex'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-telephone " viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                </svg>
                                    <div className='ps-4'>1900123456</div>
                                </Link>
                                <Link to="" className='d-flex'>
                                    <i className="bi bi-envelope p-0"></i>
                                    <div className='ps-4'>examle@google.com.vn</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const EmailChoChungToi = ({ activeId, getActive }) => {

    return (
        <form id={activeId}  >
            <h2 className=' title-main container text-center d-block mx-auto border-bottom'>Send Email to me</h2>
            <div className='container' >
                <div className='sendEmail border-bottom '>
                    <div className='sendEmailInput-group  '>
                        <label htmlFor='your-full-name...  '>Full name</label>
                        <input placeholder='Enter your full name' type='text' name='your-full-name' id='your-full-name' />
                    </div>
                    <div className='sendEmailInput-group clear-fix d-flex justify-content-between'>
                        <div className='pull-left'>
                            <label>Email</label>
                            <input placeholder='Enter your email...' type='email' name='your-email' id='your-email' />
                        </div>
                        <div className='pull-right'>
                            <label>Phone number</label>
                            <input placeholder='Enter your phone number...' type='text' name='your-phoneNumber' id='your-phoneNumber' />
                        </div>
                    </div>

                    <div className='sendEmailInput-group '>
                        <label>Email title</label>
                        <input type='text' name='your-email-title' id='your-email-title' />
                    </div>
                    <div className='sendEmailInput-group '>
                        <label>Email content</label>
                        <textarea name='your-email-content' wrap="hard" id='your-email-content' />
                    </div>
                </div>
            </div>
            <div className='container text-center'>
                <button onClick={() => toast.success('Send succesfully!', { autoClose: 2000 })} type="button" className="btn btn-primary btn-lg mx-auto">Send</button>
            </div>
        </form>
    )
}

export const Hotrotructuyen = ({ activeId }) => {

    return (
        <div id={activeId}>
            <h2 className=' title-main container text-center d-block mx-auto border-bottom'>Online support</h2>
            <div className='container'>
                <div className='m-auto '>
                    <div className='text-center mb-4 '>
                        <div className='gearRotate d-inline-block'>

                            <i className="bi bi-gear "></i>
                        </div>
                    </div>
                    <div>
                        <p className='text-center text-online-sp'>The functionality is being worked on. Thank you for your understanding! </p>
                    </div>
                </div>



            </div>
        </div>
    )
}