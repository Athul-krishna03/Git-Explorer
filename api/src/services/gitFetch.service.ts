import axios from "axios";

export async function fetchUserDataFromGitHub(username: string) {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);
    const followersRes = await axios.get(`https://api.github.com/users/${username}/followers`);
    const followingRes = await axios.get(`https://api.github.com/users/${username}/following`);

    if (userRes.status !== 200) throw new Error("Failed to fetch user data");


    console.log("repo Data",reposRes.data[0]);

    return {
        user: {
        username: userRes.data.login,
        name: userRes.data.name,
        avatar_url: userRes.data.avatar_url,
        bio: userRes.data.bio,
        blog: userRes.data.blog,
        location: userRes.data.location,
        public_repos: userRes.data.public_repos,
        public_gists: userRes.data.public_gists,
        followersCount: userRes.data.followers,
        followingCount: userRes.data.following,
        github_created_at: userRes.data.created_at,
        followersList: followersRes.data.map((f: any) =>{
            return {
                login: f.login,
                avatar_url: f.avatar_url,
            };
        }),
        followingList: followingRes.data.map((f: any) =>{
            return {
                login: f.login,
                avatar_url: f.avatar_url,
            };
        }),
        repos: reposRes.data.map((r: any) => ({
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            git_url: r.git_url,
            topics: r.topics,
        })),
        },
    };
}
