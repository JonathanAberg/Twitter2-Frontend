import "../styles/tweetssection.css";

import dixie from "../assets/dixie.png";

export function TweetsSection({ children }) {
  return (
    <div className="tweetsection-wrapper">
      <div className="profile-pic">
        <img src={dixie} alt="Profile Picture" />
      </div>
      <div className="profile-info">
        <div className="column-content">
          <div className="profile-label">
            <p>
              <strong>Dixie</strong>
            </p>
            <p className="user-desc">@Dixie1234 &#x2022; 44m</p>
          </div>
          <p>{children}</p>
          <div className="messages-stats">
            <svg
              className="messages-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-message-square-icon lucide-message-square"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
