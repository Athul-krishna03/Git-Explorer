import React, { useCallback, useState } from "react";
import { useSavedUsers } from "../hooks/useSavedUsers";
import { useUpdateUser } from "../hooks/useUpdateUser";
import "../style/savedUser.css";

interface User {
    _id: string;
    username: string;
    avatar_url: string;
    bio: string;
    location: string;
    followersCount: number;
    followingCount: number;
    login?: string; 
}

const SavedUsers: React.FC = React.memo(() => {
    const { data: savedUsers, isLoading, error } = useSavedUsers();
    const updateUser = useUpdateUser();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({});
    const handleEditChange = useCallback((field: keyof User, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        await updateUser.mutateAsync({
        id: selectedUser._id,
        ...formData,
        });

        setSelectedUser(null);
        setFormData({});
        setIsEdit(false);
    }, [formData, selectedUser, updateUser]);

    if (isLoading) return <p>Loading saved users...</p>;
    if (error) return <p>Error fetching users</p>;

    return (
        <div className="saved-users-container">
        <h2>Saved Users</h2>
        <ul className="saved-users-list">
            {savedUsers && savedUsers.length > 0 ? (
            savedUsers.map((user: User) => (
                <li key={user._id} className="saved-user-card">
                <div className="user-info">
                    <img src={user.avatar_url} alt={user.username} />
                    <h2>{user.username || user.login}</h2>
                    <p>{user.bio}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <p>
                    <strong>Followers:</strong> {user.followersCount} |{" "}
                    <strong>Following:</strong> {user.followingCount}
                    </p>
                </div>
                <div className="buttons">
                    <button
                    className="view-btn"
                    onClick={() => {
                        setSelectedUser(user);
                        setIsEdit(false);
                    }}
                    >
                    View
                    </button>
                    <button
                    className="edit-btn"
                    onClick={() => {
                        setSelectedUser(user);
                        setIsEdit(true);
                        setFormData(user); // preload form with user data
                    }}
                    >
                    Edit
                    </button>
                </div>
                </li>
            ))
            ) : (
            <p>No saved users found.</p>
            )}
        </ul>

        {/* Modal */}
        {selectedUser && (
            <div className="modal-overlay">
            <div className="modal">
                <button className="close-btn" onClick={() => setSelectedUser(null)}>
                ✕
                </button>

                {!isEdit ? (
                <div className="view-user">
                    <img
                    src={selectedUser.avatar_url}
                    alt={selectedUser.username}
                    className="modal-avatar"
                    />
                    <h3>{selectedUser.username}</h3>
                    <p>{selectedUser.bio}</p>
                    <p>{selectedUser.location}</p>
                </div>
                ) : (
                <form className="edit-form" onSubmit={handleSubmit}>
                    <img
                    src={selectedUser.avatar_url}
                    alt={selectedUser.username}
                    className="modal-avatar"
                    />
                    <label>
                    Username
                    <input
                        type="text"
                        value={formData.username || ""}
                        onChange={(e) => handleEditChange("username", e.target.value)}
                    />
                    </label>
                    <label>
                    Bio
                    <input
                        type="text"
                        value={formData.bio || ""}
                        onChange={(e) => handleEditChange("bio", e.target.value)}
                    />
                    </label>
                    <label>
                    Location
                    <input
                        type="text"
                        value={formData.location || ""}
                        onChange={(e) => handleEditChange("location", e.target.value)}
                    />
                    </label>
                    <div className="form-actions">
                    <button type="button" onClick={() => setSelectedUser(null)}>
                        Cancel
                    </button>
                    <button type="submit" disabled={updateUser.isPending}>
                        {updateUser.isPending ? "Saving..." : "Save"}
                    </button>
                    </div>
                </form>
                )}
            </div>
            </div>
        )}
        </div>
    );
});

export default SavedUsers;
