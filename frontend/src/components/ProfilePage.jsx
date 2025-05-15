import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import Tweet from "../components/Tweet";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = () => {
  const { id } = useParams(); // USER ID FROM URL
  const [activeTab, setActiveTab] = useState("tweets");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [userData, setUserData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = id || localStorage.getItem("userId");
        if (!userId) {
          setError("No user ID provided");
          setLoading(false);
          return;
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          id: data._id,
          name: data.name,
          username: data.nickname || data.name,
          bio: data.about || "",
          profileImage: data.profileImage || "./assets/default.png",
          coverImage: data.coverImage || "./assets/default-cover.png",
          following: data.following?.length || 0,
          followers: data.followers?.length || 0,
          joinDate: new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile");
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        if (!userData?.id) return;

        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/tweets/user/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tweets");
        }

        const data = await response.json();
        setTweets(data);
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Failed to load tweets");
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [userData?.id]);

  useEffect(() => {
    if (!tweets.length) {
      setFilteredTweets([]);
      return;
    }

    try {
      switch (activeTab) {
        case "tweets":
          setFilteredTweets(tweets.filter((tweet) => !tweet.isReply));
          break;
        case "replies":
          setFilteredTweets(tweets.filter((tweet) => tweet.isReply));
          break;
        case "media":
          setFilteredTweets(tweets.filter((tweet) => tweet.hasMedia));
          break;
        case "likes":
          setFilteredTweets(
            tweets.filter(
              (tweet) => userData.likes && userData.likes.includes(tweet.id)
            )
          );
          break;
        default:
          setFilteredTweets([]);
          break;
      }
    } catch (error) {
      console.error("Error filtering tweets:", error);
      setFilteredTweets([]);
    }
  }, [activeTab, tweets, userData.likes]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData.id;

      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedProfile.name,
          about: updatedProfile.bio,
          hometown: updatedProfile.location,
          profileImage: updatedProfile.profileImage,
          coverImage: updatedProfile.coverPhoto,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUserData({
        ...userData,
        name: updatedProfile.name,
        bio: updatedProfile.bio,
        location: updatedProfile.location,
        profileImage: updatedProfile.profileImage,
        coverImage: updatedProfile.coverPhoto,
      });

      console.log("ProfilePage: Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!userData) return <div className="error">User not found</div>;

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
    </div>
  );
};

export default ProfilePage;
