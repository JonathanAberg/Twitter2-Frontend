import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProfilePage.css";
import Tweet from "../components/Tweet";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = ({ id: propId }) => {
  const { id: urlId } = useParams();
  const userId = propId || urlId || localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("tweets");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    username: "",
    bio: "",
    hometown: "",
    profilepicture: "",
    coverpicture: "",
    following: 0,
    followers: 0,
    joinDate: "",
    likes: [],
  });
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTweetDeleted = (deletedTweetId) => {
    
    setTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== deletedTweetId)
    );
    setFilteredTweets((prevTweets) =>
      prevTweets.filter((tweet) => tweet._id !== deletedTweetId)
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError("No user ID provided");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vänligen logga in igen");
          setLoading(false);

          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }

        const response = await fetch(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.log("Auth token invalid, redirecting to login page");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setError("Din session har gått ut. Vänligen logga in igen."); // "Your session has expired. Please log in again."

          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();

        setUserData({
          id: data._id,
          name: data.name,
          username: data.nickname || data.name,
          about: data.about || "",

          hometown: data.hometown,

          profilepicture: data.profilepicture || "https://placehold.co/150x150",
          coverpicture: data.coverpicture || "/src/assets/default-cover.jpg",

          following: data.following?.length || 0,
          followers: data.followers?.length || 0,
          joinDate: new Date(data.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          likes: data.likes || [],
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user profile");
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        if (!userData?.id) return;

        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/tweets/user/${userData.id}`,
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
    const fetchLikedTweets = async () => {
      if (activeTab !== "likes") return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token || !userData?.id) return;

        const response = await fetch(
          `http://localhost:5001/api/tweets/liked/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch liked tweets");
        }

        const data = await response.json();
        setFilteredTweets(data);
      } catch (err) {
        console.error("Error fetching liked tweets:", err);
        setError("Failed to load liked tweets");
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "likes") {
      fetchLikedTweets();
    } else {
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
          default:
            setFilteredTweets([]);
            break;
        }
      } catch (error) {
        console.error("Error filtering tweets:", error);
        setFilteredTweets([]);
      }
    }
  }, [activeTab, tweets, userData.id]);

  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const token = localStorage.getItem("token");
      const userId = userData.id;

      const response = await fetch(
        `http://localhost:5001/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: updatedProfile.name,
            about: updatedProfile.about,
            hometown: updatedProfile.location,
            profilepicture: updatedProfile.profilepicture,
            coverpicture: updatedProfile.coverpicture,
            }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setUserData({
        ...userData,
        name: updatedProfile.name,
        about: updatedProfile.about,
        location: updatedProfile.location,
        profilepicture: updatedProfile.profileImage,
        coverpicture: updatedProfile.coverpicture,
        hometown: updatedProfile.hometown,
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
    <div className="twitter-profile">
      <ProfileHeader user={userData} onProfileUpdate={handleProfileUpdate} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tweets-container">
        {loading ? (
          <div className="loading">Loading profile...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredTweets && filteredTweets.length > 0 ? (
          filteredTweets.map((tweet) => (
            <Tweet
              key={tweet._id || tweet.id}
              tweet={tweet}
              onTweetDeleted={handleTweetDeleted}
            />
          ))
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
