import './LoginForm.scss'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useRef } from 'react/cjs/react.development';


const Login = () => {
    const { login, currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const handleSubmitLogin = e => {
        e.preventDefault()
        login(emailRef.current.value, passwordRef.current.value)
    }
    
    console.log(currentUser && currentUser.displayName)

    return (
        <>
            <Header />
            {currentUser && currentUser.email}
            <div className='loginDiv' >
                {/* {currentUser && <div>{}</div>} */}
                <form className="loginForm " onSubmit={handleSubmitLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
                        <input type="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" ref={passwordRef} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className='div2login'>
                    Need an account? <Link to='/register'>Register!</Link>
                </div>
            </div>
        </>
    )
};

export default Login;
