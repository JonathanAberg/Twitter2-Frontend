import '../styles/tweetbox.css'

import profilePlaceholder from '../assets/profile-placeholder.jpg'

export function Tweetbox() {
    return (
        <div className="tweetbox-wrapper">
            <div className="tweetbox-top-layer">
            <div className="user-pic">
                <img src={profilePlaceholder} alt="Profile Picture" />
            </div>
            <input id="post-tweet-text-field" placeholder="What's happening?" type="text" />
            </div>
            <div className="tweetbox-bottom-container">
            <button className="post-tweet-btn">
            Tweet
            </button>
            </div>
        </div>
    )
}