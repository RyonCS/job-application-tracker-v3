import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
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
