import React from "react";
import { Link } from "react-router-dom";
import InstaMainImg from './assets/images/instagram-web-lox-image.png';
import instaLogo from './assets/images/insta.jpg';

function SignUp(){
    return(
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
                        <p className="text-center" >Sign up to see photos and videos from your friends.</p>
                    </div> 
                    <div className='grid grid-cols-1 items-center'>
                        <div className='flex flex-col gap-2'>
                            <input type='text' className='block h-10 w-full mt-10 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='Mobile Number or Email' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type='password' className='block h-10 w-full mt-5 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='password' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type='text' className='block h-10 w-full mt-5 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='Full Name' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input type='text' className='block h-10 w-full mt-5 appearance-none rounded-lg bg-gray-50 px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500' placeholder='Username' />
                        </div>
                        <button type='button' className='w-full justify-center text-white rounded-lg bg-blend-hard-light bg-blue-500 mt-8 p-2 cursor-pointer ' >Sign up</button>     
                       
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignUp;