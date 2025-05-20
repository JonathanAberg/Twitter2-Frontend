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
    profileImage: "",
    coverImage: "",
    following: 0,
    followers: 0,
    joinDate: "",
    likes: [],
  });
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        console.log(
          "Fetching user data for ID:",
          userId,
          "with token:",
          token.substring(0, 10) + "..."
        );

        const response = await fetch(
          `http://localhost:5001/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.log("Auth token ogiltig, omdirigerar till inloggning");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setError("Din session har gått ut. Vänligen logga in igen.");

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
          bio: data.about || "",
          profileImage: data.profileImage || "https://placehold.co/150x150",
          coverImage: data.coverImage || "/src/assets/default-cover.jpg",
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
              (tweet) => userData?.likes && userData.likes.includes(tweet.id)
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

      const response = await fetch(`http://localhost:5001/user/${userId}`, {
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
    <div className="twitter-profile">
      <ProfileHeader user={userData} onProfileUpdate={handleProfileUpdate} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tweets-container">
        {loading ? (
          <div className="loading">Loading profile...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredTweets && filteredTweets.length > 0 ? (
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
