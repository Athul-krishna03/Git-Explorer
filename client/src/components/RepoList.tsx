import React from "react";

export interface Repo {
    name: string;
    description?: string;
    html_url: string;
    git_url: string;
    topics: string[];
}

interface RepoListProps {
    repos: Repo[];
    onClickRepo?: (repo: Repo) => void;
}

const RepoList: React.FC<RepoListProps> = ({ repos, onClickRepo }) => {
    return (
        <div className="repo-info">
        <h3>Repositories</h3>
        <ul>
            {repos.map((repo, index) => (
            <li key={index} onClick={() => onClickRepo?.(repo)}>
                <strong>{repo.name}</strong>
                <span>{repo.description || "No description available"}</span>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default RepoList;
