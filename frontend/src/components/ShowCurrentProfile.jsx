import profilePlaceholder from '../assets/profile-placeholder.jpg'
import '../styles/showcurrentprofile.css'

import { useContext } from 'react';
import { UserContext } from './UserContext';

export function ShowCurrentProfile({ children }) {
const { user } = useContext(UserContext);

console.log("User in ShowCurrentProfile:", user);

  if (!user) return null;
    
    return (
                    <div className="profileinfo-wrapper">
                    <div className="user-pic">
                        <img src={profilePlaceholder} alt="Profile Picture" />
                    </div>
                    <div className="profileinfo-text">
                    <strong>{user.name}</strong>
                    <p className="user-desc">@{user.nickname}</p>
                    </div>
                    {children}
                    </div>
                    )
}