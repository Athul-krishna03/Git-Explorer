import React, { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import RepoList, { type Repo } from "./components/RepoList";
import FollowersList from "./components/FollowersList";
import RepoDetails from "./components/RepoDetails";
import "./App.css";
import SavedUsers from "./components/SavedUsers";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"repos" | "followers">("repos");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [savedUsersPart, setSavedUsersPart] = useState(false);

  const { data, isLoading, error, refetch } = useSearch(inputValue);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setInputValue(inputValue);
    refetch();
  };

  const handleFollowerClick = (username: string) => {
    setInputValue(username);
    refetch();
  };

  return (
    <div className="app-container">
      <div className="header-bar">
        <button
          className="toggle-btn"
          onClick={() => setSavedUsersPart(!savedUsersPart)}
        >
          {savedUsersPart ? "Show All Users" : "Show Saved Users"}
        </button>
      </div>
      {savedUsersPart && <SavedUsers />}
      {!savedUsersPart && (
        <div className="container">
          <h1>GitHub Explorer</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          {!data && !isLoading && !error && (
            <p className="default-msg">🔍 Start by searching a GitHub user</p>
          )}
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{(error as Error).message}</p>}
          {data?.user && (
            <>
              <div className="user-info">
                <img src={data.user.avatar_url} alt={data.user.login} />
                <h2>{data.user.name || data.user.login}</h2>
                <p>{data.user.bio}</p>
                <p>
                  <strong>Followers:</strong> {data.user.followersCount} |{" "}
                  <strong>Following:</strong> {data.user.followingCount}
                </p>
              </div>
              <div className="tabs">
                <button
                  className={activeTab === "repos" ? "active" : ""}
                  onClick={() => setActiveTab("repos")}
                >
                  Repositories
                </button>
                <button
                  className={activeTab === "followers" ? "active" : ""}
                  onClick={() => setActiveTab("followers")}
                >
                  Followers
                </button>
              </div>
              {activeTab === "repos" && (
                <RepoList repos={data.user.repos} onClickRepo={setSelectedRepo} />
              )}
              {activeTab === "followers" && (
                <FollowersList
                  followers={data.user.followersList}
                  onClickFollower={handleFollowerClick}
                />
              )}
              {selectedRepo && (
                <RepoDetails
                  repo={selectedRepo}
                  onClose={() => setSelectedRepo(null)}
                  avatar_url={data.user.avatar_url}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
