import { useState, useEffect } from "react";
import "../styles/ProfilePage.css";
import Tweet from "./Tweet";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { mockUserData, mockTweets } from "../mockData";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("tweets");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [userData, setUserData] = useState(mockUserData);

  useEffect(() => {
    console.log("ProfilePage: Filtering tweets for tab:", activeTab);
    console.log("ProfilePage: Available tweets:", mockTweets);
    console.log("ProfilePage: User ID:", userData.id);

    let tweets = [];
    try {
      switch (activeTab) {
        case "tweets":
          tweets = mockTweets.filter(
            (tweet) => tweet.userId === userData.id && !tweet.isReply
          );
          break;
        case "replies":
          tweets = mockTweets.filter(
            (tweet) => tweet.userId === userData.id && tweet.isReply
          );
          break;
        case "media":
          tweets = mockTweets.filter(
            (tweet) => tweet.userId === userData.id && tweet.hasMedia
          );
          break;
        case "likes":
          tweets = mockTweets.filter(
            (tweet) => userData.likes && userData.likes.includes(tweet.id)
          );
          break;
        default:
          tweets = [];
      }
    } catch (error) {
      console.error("Error filtering tweets:", error);
      tweets = [];
    }

    console.log("ProfilePage: Filtered tweets:", tweets);
    setFilteredTweets(tweets);
  }, [activeTab, userData.id, userData.likes]);

  const handleProfileUpdate = (updatedProfile) => {
    console.log("ProfilePage: Updating profile with:", updatedProfile);

    setUserData({
      ...userData,
      name: updatedProfile.name,
      bio: updatedProfile.bio,
      location: updatedProfile.location,
      profileImage: updatedProfile.profileImage,
      coverImage: updatedProfile.coverPhoto,
    });

    console.log("ProfilePage: Profile updated successfully");
  };

  console.log("ProfilePage: Rendering component");

  return (
    <div className="profile-page">
      <ProfileHeader user={userData} onProfileUpdate={handleProfileUpdate} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tweets-container">
        {filteredTweets && filteredTweets.length > 0 ? (
          filteredTweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
        ) : (
          <div className="no-tweets">
            No tweets to display for the "{activeTab}" section.
          </div>
        )}
      </div>
      <div className="debug-mode">Debug Mode: Active</div>
    </div>
  );
};

export default ProfilePage;
