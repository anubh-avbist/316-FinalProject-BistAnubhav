import { useContext } from 'react'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const {getLoggedIn} = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + getLoggedIn());
    
    return <div>
        <h2> hi </h2>
    </div>
}