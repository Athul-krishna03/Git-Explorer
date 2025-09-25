import React from "react";
import type { Repo } from "./repoList";
import "../style/repoDetails.css"

interface RepoDetailsProps {
    repo: Repo;
    avatar_url?: string;
    onClose: () => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo, onClose, avatar_url }) => {
    return (
        <div className="repo-popup-overlay" onClick={onClose}>
        <div className="repo-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="repo-left">
            <img src={avatar_url || ""} alt={repo.name} />
            
            {repo.topics && repo.topics.length > 0 && (
                <>
                <h3>Topics</h3>
                <div className="topics">
                    {repo.topics.map((topic, idx) => (
                    <span key={idx}>{topic}</span>
                    ))}
                </div>
                </>
            )}
            </div>
            <div className="repo-info">
            <div>
                <h2>{repo.name}</h2>
                <p>{repo.description || "No description available"}</p>
            </div>

            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-btn">
                View on GitHub
            </a>
            </div>
        </div>
        </div>
    );
};

export default RepoDetails;
