import React, { useState } from 'react'
import helpfulDevLogo from './images/HelpfulDev-removebg-preview.png'
import { RiTwitterXFill, RiInstagramLine } from "react-icons/ri";
import { useRegisterMutation } from '../slices/emailsApiSlice';
import { toast } from 'react-toastify';

const Showcase = () => {
    // Email state
    const [email, setEmail] = useState<string>('')

    const [register, {isLoading}] = useRegisterMutation()

    // Email test regex
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleEmail = async () => {

        // Check if the user typed in a email
        if(!email){
            toast.error('Please type in a email')
            return 
        }

        if(!re.test(email)){
            toast.error('Please type in a valid email')
            return 
        }


        try {
            // Send POST req
            const res = await register({email}).unwrap()

            // Check for res
            if(res){
                // Send toast message
                toast.success("Stay tuned! We'll notify you upon launch.")
            }else{
                // Else send toast error
                toast.error("Internal error, Try again!")
            }
        } catch (err:any) {
            // Send toast error
            toast.error(err?.data?.message || err.error)
        }
        // Clear email
        setEmail('')
    }

  return (
    <div className='showcase overflow-hidden '>
        <div className='showcaseItems container mx-auto px-10 overflow-hidden'>
            <div className="logo">
                <a href="">
                    <img className='z-10 relative h-60' src={helpfulDevLogo} alt="" />
                </a>
            </div>
            <h1 className='text-5xl w-full font-medium text-center text-white z-10 relative -translate-y-12'>Connecting Non-Profits with volunteer Software Engineers!</h1>
            <h3 className='text-xl text-center text-white z-10 relative my-7 -translate-y-12'>More info coming soon! Type in your email address to get notified.</h3>
            <div className="emailForm mt-10 text-center flex justify-center -translate-y-12 z-10 relative mt ">
                <div className="inputContainer">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='emailFormInput z-10 relative rounded bg-transparent border-4 border-[#E93D3D] px-5 py-2 w-80 text-white' />
                    <label className={email && 'filled'} htmlFor="">Email...</label>
                </div>
                <button onClick={handleEmail} className='z-10 relative bg-[#E93D3D] mx-2 text-white rounded py-2 px-3 text-xl focus:outline-none'>Notify Me!</button>
            </div>
            <p className='text-white z-10 relative text-center text-xl'>Follow the development journey below!</p>
            <div className="socialIcons flex text-white z-10 relative align-center justify-center my-5">
                <a target='_blank' href='https://twitter.com/HelpfulDevApp' className='mx-2 text-4xl'><RiTwitterXFill /></a>
                <a target='_blank' href='https://www.instagram.com/helpfuldevapp/' className='mx-2 text-4xl'><RiInstagramLine /></a>
            </div>
        </div>
    </div>
  )
}

export default Showcase