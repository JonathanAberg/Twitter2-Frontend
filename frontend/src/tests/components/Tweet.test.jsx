import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tweet from "../../components/Tweet";

global.fetch = vi.fn();

describe("Tweet Component", () => {
  const mockTweet = {
    _id: "tweet123",
    content: "This is a test tweet",
    user: {
      _id: "user123",
      name: "Test User",
      profileImage: "test-image-url",
    },
    likes: [],
    createdAt: new Date().toISOString(),
    hashtags: ["test"],
  };

  const renderTweet = (props = {}) => {
    render(
      <BrowserRouter>
        <Tweet tweet={mockTweet} {...props} />
      </BrowserRouter>
    );
  };

  it("renders tweet content correcutly", () => {
    renderTweet();

    expect(screen.getByText(mockTweet.content)).toBeInTheDocument();
    expect(screen.getByText(mockTweet.user.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockTweet.user.name)).toHaveAttribute(
      "src",
      mockTweet.user.profileImage
    );
  });

  it("handles like interaction", async () => {
    const userId = "currentUser123";
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", "fake-token");

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ...mockTweet, likes: [userId] }),
    });

    renderTweet();

    const likeButton = screen.getByRole("Button", { name: "0" });
    fireEvent.click(likeButton);

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:5001/api/tweets/${mockTweet._id}/like`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer fake-token",
        },
      }
    );
  });

  it("displays hashtags as links", () => {
    renderTweet();

    const hashtagLink = screen.getByText("#test");
    expect(hashtagLink).toBeInTheDocument();
    expect(hashtagLink.tagName).toBe("A");
    expect(hashtagLink).toHaveAttribute("href", "/hashtag/test");
  });

  it("navigates to user profile when username is clicked", () => {
    renderTweet();

    const userNameLink = screen.getByText(mockTweet.user.name);
    expect(userNameLink).toHaveAttribute(
      "href",
      `/profile/${mockTweet.user._id}`
    );
  });
});
