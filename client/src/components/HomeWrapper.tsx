import { useContext } from 'react'
import AuthContext from '../auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function HomeWrapper() {
    const { getLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log("HomeWrapper auth.loggedIn: " + getLoggedIn())

    const onLogin = () => {
        navigate('/login');
    }

    return (
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <Button variant = "outlined"> Continue As Guest </Button>
            <Button variant = "outlined" onClick={onLogin}> Login </Button>
            <Button variant = "outlined"> Register </Button>
        </div>
    )
}  
