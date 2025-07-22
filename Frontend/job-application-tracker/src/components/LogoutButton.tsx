import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post(`${BACKEND_URL}/api/v1/auth/logout`, {}, {
          withCredentials: true
        });
        navigate('/login');
    }

  return (
    <button 
        onClick={handleLogout} 
        className="px-4 py-2 text-white hover:bg-blue-600 rounded-2xl">
        Logout
    </button>
  )
}

export default LogoutButton;
