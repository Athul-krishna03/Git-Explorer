import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    name?: string;
    avatar_url?: string;
    bio?: string;
    blog?: string;
    location?: string;
    public_repos: number;
    public_gists: number;
    followersCount: number;
    followingCount: number;
    followersList: [{
        login: string;
        avatar_url: string;
    }];  
    followingList: [{
        login: string;
        avatar_url: string;
    }]; 
    repos: Array<{ 
        name: string; 
        description?: string;
        html_url: string; 
        git_url: string; 
        topics: string[]; 
    }>;
    github_created_at: Date;
    is_deleted: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: true },
        name: String,
        avatar_url: String,
        bio: String,
        blog: String,
        location: String,
        public_repos: Number,
        public_gists: Number,
        followersCount: Number,
        followingCount: Number,
        followersList: [{
            login: String,
            avatar_url: String
        }],
        followingList: [{
            login: String,
            avatar_url: String
        }],
        repos: [
        {
            name: String,
            description: String,
            html_url: String,
            git_url: String,
            topics: [String],
        },
        ],
        github_created_at: Date,
        is_deleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
