import { useContext } from 'react'
import AuthContext from '../auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AudiotrackIcon from '@mui/icons-material/Audiotrack';


export default function HomeWrapper() {
    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log("HomeWrapper auth.loggedIn: " + getLoggedIn())

    const onLogin = () => {
        navigate('/login');
    }

    const onRegister = () => {
        navigate('/register');
    }

    const onContinue = () => {
        navigate('/songs');
    }

    return (
        <>
            <h1> Welcome to the home page!</h1>
            <AudiotrackIcon sx={{ fontSize: "20vw" }} />            
            <br />
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={onContinue}> Continue As Guest </Button>
                <Button variant="outlined" onClick={onLogin}> Login </Button>
                <Button variant="outlined" onClick={onRegister}> Register </Button>
            </div>
        </>
    )
}  
