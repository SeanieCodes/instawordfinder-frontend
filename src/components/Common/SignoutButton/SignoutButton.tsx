import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import './SignoutButton.css';

const SignoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    const handleSignOut = () => {
        logout(); 
        navigate('/login');
    };

    return (
        <button 
            className="signout-button" 
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
};

export default SignoutButton;