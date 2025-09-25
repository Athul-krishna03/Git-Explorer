import React from "react";
import "../style/followersList.css"

interface Follower {
    login: string;
    avatar_url: string;
}

interface FollowersListProps {
    followers: Follower[];
    onClickFollower?: (username: string) => void;
}

const FollowersList: React.FC<FollowersListProps> = React.memo(({ followers, onClickFollower }) => {
    return (
        <div className="followers-info">
        <h3>Followers</h3>
        <ul>
            {followers.map((follower, index) => (
            <li key={index} onClick={() => onClickFollower?.(follower.login)}>
                <img src={follower.avatar_url} alt={follower.login} />
                <span>{follower.login}</span>
                
            </li>
            ))}
        </ul>
        </div>
    );
});

export default FollowersList;
