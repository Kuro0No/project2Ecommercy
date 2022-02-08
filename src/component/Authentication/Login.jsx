import './LoginForm.scss'
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { useRef } from 'react/cjs/react.development';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';



const Login = () => {
    const { login } = useAuth()

    const [loading, setLoading] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const handleSubmitLogin = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            await login(emailValue, passwordValue)

        } catch {
            toast.warn('Wrong password or email', {
                autoClose: 1500,
            });
        }
        setLoading(false)
    }





    return (
        <>

            <div className='loginDiv' >
                <form className="loginForm " onSubmit={handleSubmitLogin}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" >Email</label>
                        <input type="email" className="form-control" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    {/* <button disabled={loading} type="submit" className="btn btn-primary">Submit</button> */}
                    <Button type="primary" htmlType='submit' disabled={loading} loading={loading} shape="round" >
                        Login
                    </Button>
                </form>
                <div className='div2login'>
                    Need an account? <Link to='/register'>Register!</Link>
                </div>
            </div>

        </>
    )
};

export default Login;
