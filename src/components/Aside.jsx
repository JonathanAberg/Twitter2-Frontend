import "../styles/aside.css";
import React from "react";
export function Aside() {
  return (
    <div className="trends-aside-wrapper">
      <div className="search-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-search-icon lucide-search"
        >
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </svg>
        <input id="search-field" type="text" placeholder="Search Twitter" />
      </div>
      <div className="trends">
        <h2 className="trends-aside-title">Trends for you</h2>
        <div className="topic-wrapper">
          <div className="topic-container">
            <p className="trend-description">Trending in Sweden</p>
            <strong className="topic">Samt</strong>
            <p className="tweets-amount">2,640 Tweets</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
        <div className="topic-wrapper">
          <div className="topic-container">
            <p className="trend-description">Poltics &#x2022; Trending</p>
            <strong className="topic">China</strong>
            <p className="tweets-amount">527K Tweets</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
        <div className="topic-wrapper">
          <div className="topic-container">
            <p className="trend-description">Trending in Sweden</p>
            <strong className="topic">#Israel</strong>
            <p className="tweets-amount">10.4K Tweets</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
        <div className="topic-wrapper">
          <div className="topic-container">
            <p className="trend-description">Trending in Sweden</p>
            <strong className="topic">#babygirl</strong>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
        <div className="topic-wrapper">
          <div className="topic-container">
            <p className="trend-description">Trending in Sweden</p>
            <strong className="topic">Newroz</strong>
            <p className="tweets-amount">60.4K Tweets</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-ellipsis-icon lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}
