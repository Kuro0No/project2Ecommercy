import Header from "../Header/Header";
import './Register.scss'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from '../../AuthContext/AuthContext';




const Register = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConFirmRef = useRef()
    const displayName = useRef()
    const { register, updateProfile } = useAuth()
    const handleSignUpSubmit = async (e) => {
        e.preventDefault()
       await register(emailRef.current.value, passwordRef.current.value,displayName.current.value)
        navigate('/product')
        
    }
    console.log(currentUser)

    return (
        <>
            <Header />
            
            <div className="registerDiv">

                <form className="registerForm " onSubmit={handleSignUpSubmit}>
                    <div className="mb-3">
                        <label htmlFor="displayname" className="form-label" >Display Name</label>
                        <input type="text" className="form-control" ref={displayName} id="displayname" />

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
