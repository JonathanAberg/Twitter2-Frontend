import TwitterLogo from '../assets/twitter-logo.svg'
import '../styles/logoutPopup.css'

export function LogoutPopup() {

     return (
        <div className="logout-wrapper">
            <div className="logo-container">
                <img src={TwitterLogo} alt="Twitter Logo" />
                <h3>Log out of Twitter</h3>
            </div>
            <div className="btn-wrapper">
                <button className="logout-btn">
                Log out
                </button >
                <button className="cancel-btn">
                Cancel    
                </button>
            </div>
</div>
    )
}