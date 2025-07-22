import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

interface AuthFormProps {
    title: string;
    action: string;
    buttonText: string;
    bottomText: string;
    bottomLinkText: string;
    bottomLinkHref: string;
}

const AuthForm = ({
    title,
    action,
    buttonText,
    bottomText,
    bottomLinkText,
    bottomLinkHref
}: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Backend URL:', BACKEND_URL);
    try {
        await axios.post(
        `${BACKEND_URL}${action}`,
        { emailAddress, password, },
        { withCredentials: true,}
        );
        setLoading(false);
        navigate('/JobApplications');

    } catch (error: any) {
        if (error.response) {
            alert(error.response.data.message || 'Login failed');
            console.error('Login failed:', error.response.data);
            setLoading(false);
        } else {
            alert('An unexpected error occurred.');
            console.error('Error:', error.message);
            setLoading(false);
        }
    }
}

if (loading) { return <div>🕒 Waking up server, please wait...</div>; }

  return (
    /* Page level container. Allows for centering items within the page as well as padding so text doesn't stick to edge of screen.*/
    <div className="flex items-center justify-center bg-gray-100 px-4 overflow-hidden overflow-y-auto">
        {/* Form Card. Padding so text inside doesn't stick to edge of form. Centers items. Allows for shrinking of form. */}
        <div className="bg-white p-14 pb-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-8 text-[#113F67]"> {title} </h1>
            {/* Login Form. */}
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-2">
                <div className="w-full">
                    <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full border border-[#113F67] text-center rounded-2xl px-4 py-2"
                    />
                </div>

                <div className="w-full">
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full border border-[#113F67] text-center rounded-2xl px-4 py-2"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-fit border rounded-2xl px-6 py-2 bg-[#113F67] text-white hover:bg-blue-600"
                >
                    {buttonText}
                </button>
                <div className="text-sm mt-8 text-gray-600">
                    {bottomText}{' '}
                    <NavLink to={bottomLinkHref} className="text-[#113F67] underline hover:text-blue-600">
                    {bottomLinkText}
                    </NavLink>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AuthForm;
