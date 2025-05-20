import "../styles/aside.css";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

export function Aside() {
  return (
    <div className="trends-aside-wrapper">
      <div className="search-wrapper">
        <FiSearch className="lucide-search-icon" />
        <input id="search-field" type="text" placeholder="Search Twitter" />
      </div>
      <div className="trends">
        <h2 className="trends-aside-title">Trends for you</h2>
        <TrendTopic
          title="Samt"
          description="Trending in Sweden"
          tweets="2,640"
        />
        <TrendTopic
          title="China"
          description="Politics • Trending"
          tweets="527K"
        />
        <TrendTopic
          title="#Israel"
          description="Trending in Sweden"
          tweets="10.4K"
        />
        <TrendTopic
          title="#babygirl"
          description="Trending in Sweden"
          tweets=""
        />
        <TrendTopic
          title="Newroz"
          description="Trending in Sweden"
          tweets="60.4K"
        />
      </div>
    </div>
  );
}

function TrendTopic({ title, description, tweets }) {
  return (
    <div className="topic-wrapper">
      <div className="topic-container">
        <p className="trend-description">{description}</p>
        <strong className="topic">{title}</strong>
        {tweets && <p className="tweets-amount">{tweets} Tweets</p>}
      </div>
      <FiMoreHorizontal className="lucide-ellipsis-icon" />
    </div>
  );
}
