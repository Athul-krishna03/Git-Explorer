import React, { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import RepoList, { type Repo } from "./components/RepoList";
import FollowersList from "./components/FollowersList";
import RepoDetails from "./components/RepoDetails";
import "./App.css";
import SavedUsers from "./components/SavedUsers";

const App: React.FC = () => {
  const [val, setVal] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"repos" | "followers">("repos");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [savedUsersPart, setSavedUsersPart] = useState(false);

  const { data, isLoading, error, refetch } = useSearch(inputValue);

  const handleSearch = () => {
    if (!val.trim()) return;
    setInputValue(val);
    refetch();
  };

  const handleFollowerClick = (username: string) => {
    setVal(username);
    setInputValue(username);
    refetch();
  };

  return (
    <div className="app-container">
      {/* Saved Users Toggle */}
      <div className="header-bar">
        <button
          className="toggle-btn"
          onClick={() => setSavedUsersPart(!savedUsersPart)}
        >
          {savedUsersPart ? "Show All Users" : "Show Saved Users"}
        </button>
      </div>

      {/* Show Saved Users Page */}
      {savedUsersPart && <SavedUsers />}

      {/* Main GitHub Explorer */}
      {!savedUsersPart && (
        <div className="container">
          <h1>GitHub Explorer</h1>

          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Default Message */}
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

              {/* Tabs */}
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
