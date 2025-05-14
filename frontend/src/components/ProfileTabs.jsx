import "../styles/ProfileTabs.css";

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "tweets", label: "Tweets" },
    { id: "replies", label: "Replies" },
    { id: "media", label: "Media" },
    { id: "likes", label: "Likes" },
  ];

  return (
    <div className="profile-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default ProfileTabs;
