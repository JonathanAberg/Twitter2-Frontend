import profilePlaceholder from '../assets/profile-placeholder.jpg'

import '../styles/showcurrentprofile.css'

export function ShowCurrentProfile() {
    return (
                    <div className="profileinfo-wrapper">
                    <div className="user-pic">
                        <img src={profilePlaceholder} alt="Profile Picture" />
                    </div>
                    <div className="profileinfo-text">
                    <strong>username</strong>
                    <p className="user-desc">@useruser1234</p>
                    </div>
                    </div>
                    )
}