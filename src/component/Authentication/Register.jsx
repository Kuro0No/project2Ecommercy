import Header from "../Header/Header";
import './Register.scss'
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from '../../AuthContext/AuthContext';




const Register = () => {
    const emailRef = useRef()
    const passwordRef= useRef()
    const passwordConFirmRef= useRef()
    const displayName = useRef()
    const {register } = useAuth()
    const handleSignUpSubmit = (e) => {
        e.preventDefault()

        register(emailRef.current.value, passwordRef.current.value)
    }
    return (
        <>
            <Header />
            <div className="registerDiv">

                <form className="registerForm " onSubmit={handleSignUpSubmit}>
                    <div className="mb-3">
                        <label htmlFor="displayname" className="form-label" >Display Name</label>
                        <input type="text" className="form-control" ref={displayName} id="displayname"  />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input type="email" className="form-control" ref={emailRef} id="email" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" >Password</label>
                        <input type="password" className="form-control" ref={passwordRef} id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" ref={passwordConFirmRef} id="confirmPassword" />
                    </div>
                    

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="text-center">
                    Already have an account? <Link to='/login'>Log In</Link>
                </div>
            </div>
        </>
    )
};

export default Register;
