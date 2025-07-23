import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstaMainImg from './assets/images/instagram-web-lox-image.png';
import instaLogo from './assets/images/insta.jpg';
function LoginPage(){

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        identifier:'',
        password:''
    });
    const [error, setError]=useState('');
    const [msg, suceessMsg] = useState('');

   const handleChange = (e) => {
    setLoginData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    };


    const handleLogin = async () => {
        try {
            const responseData = await fetch("https://instaclone-dj3x.onrender.com/api/user/login", {
                method:'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const result = await responseData.json();
            console.log(result);

        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <> 
        <div className="container mx-auto px-4">
            <div className="flex flex-row w-full">
                <div className="w-1/2">
                    <img className='m-20 size-9/12' src={InstaMainImg} />
                </div>
                <div className="w-1/2 pl-20">
                    <div className='w-90'>
                    <div className='instaImage pt-28'>
                        <img  src={instaLogo} />
                    </div> 
                    <div className='grid grid-cols-1 items-center'>
                        <div className='flex flex-col gap-2'>
                            <input type='text' name='identifier' onChange={handleChange} className='block h-10 w-full mt-10 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='Phone number, username, or email' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type='password' onChange={handleChange} name='password' className='block h-10 w-full mt-5 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='password' />
                        </div>
                        <button type='button' onClick={handleLogin} className='w-full justify-center text-white rounded-lg bg-blend-hard-light bg-blue-500 mt-8 p-2 cursor-pointer ' >Log in</button>
                        <div className='border-b relative text-center pt-10'><span className='bg-white absolute inline-block top-5 p-2' >Or</span></div>
                        <div className='facebooklink text-center mt-5'>
                            <a className='text-blue-500 cursor-pointer font-medium'>Login with Facebook</a>
                        </div>
                        <div className='facebooklink text-center mt-5'>
                            <a className='text-black-200 cursor-pointer font-medium'>Forget Password?</a>
                        </div>
                        <div className='facebooklink text-center mt-5'>
                           <p className='text-black-200'> Don't have an account? <Link to="/signup" className='text-blue-700 cursor-pointer font-medium'>Sign up</Link> </p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default LoginPage;