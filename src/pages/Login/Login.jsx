import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { userData } from '../../utils/Users'
import './loginform.css'

function Login() {
    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate()
    const [error, setError] = useState('')


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!userInfo.Username || !userInfo.Password) {
            setError('Please fill all the fields')
        }
        else {
            setError('')
            console.log('valid credentials')
            console.log(userInfo)
            const res = userData.find(user => user.Username === userInfo.Username && user.Password === userInfo.Password)
            if (res) {
                console.log('login successful')
                navigate('/')
            }
            else {
                setError('Invalid Credentials')
            }
            // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, userInfo)
            // console.log(res.data)
            // if (res.data.message === 'successful') {
            //     console.log("successful")
            //     await sessionStorage.setItem('userid', res.data.token)
            // }
            // else {
            //     console.log("here")
            //     setError('Invalid Credentials')
            // }
        }
    }

    const handleCallback = async (response) => {
        var userObject = jwt_decode(response.credential);
        console.log(userObject)
        const { name, email } = userObject
        const userInfoLogin = {
            Username: email,
            Email: email,
            Name: name,
            Password: userObject.sub,
            ImageUrl: userObject.picture
        }
        console.log(userInfoLogin)
        // console.log(userInfoLogin)
        // const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/googlelogin`, userInfoLogin)
        // console.log(res.data)
        // if (res.data.message === 'successful') {
        //     console.log("successful")
        //     await sessionStorage.setItem('userid', res.data.token)
        navigate('/admin')
        // }
        // else {
        //     console.log("here")
        //     setError('Invalid Credentials')
        // }
    }
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "123295967197-cg347eseqa9e0qqmqvtdlt1nu3vrad83.apps.googleusercontent.com",
            callback: handleCallback
        })
        google.accounts.id.renderButton(
            document.getElementById('google-signin'),
            { theme: 'outline', size: 'large' }
        )
    }, [])

    return (
        <div className='container'>
            <div className='form-title'><h2>ADMIN LOGIN</h2></div>
            <form className='form' onSubmit={handleSubmit}>
                {/* <img src={logo} className="w-20 h-20" alt="" /> */}
                
                <div class="form-group">
                <label for="Username" class="form-question">Username: </label>
                <input type="email" placeholder="Username" class="form-control" value={userInfo.userName} onChange={(e) => {
                    setUserInfo({ ...userInfo, Username: e.target.value })
                }} /></div>
                {/* <InputCustom placeholder="Username" field={userInfo.userName} setField={setUserInfo} name="Username"></InputCustom> */}
                
                <div class="form-group">
                <label for="Password" class="form-question">Password: </label>
                <input type="password" placeholder='Password'  class="form-control" onChange={(event) => {
                    setUserInfo((prev) => {
                        return { ...prev, Password: event.target.value }
                    })
                }} value={userInfo.Password} name='Password' className="form-control"></input>
                </div>
                {error && <div className=''>{error}</div>}
                <div class="form-group">
                <div class="row">
                    <div class="col-7">
                    
                    <input type="submit" value="Login" class="submit-button" />
                    <div className='button' id='google-signin'></div>
                </div>
                </div>
                </div>
            </form>
        </div>
    )
}

export default Login