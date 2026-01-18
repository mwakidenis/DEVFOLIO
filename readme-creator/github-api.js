// Top 5 repos by stars
async function fetchTopRepos(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`);
        const data = await res.json();
        return Array.isArray(data) ? data.map(r => r.name) : [];
    } catch(e) { console.error(e); return []; }
}

// Full user info
async function fetchUserInfo(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        return {
            name: data.name || username,
            bio: data.bio || '',
            avatar: data.avatar_url || '',
            followers: data.followers || 0,
            following: data.following || 0
        };
    } catch(e) { console.error(e); return {name:username,bio:'',avatar:'',followers:0,following:0}; }
}

// All repos with stars/forks
async function fetchAllRepos(username, sort='stars', per_page=100){
    try{
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=${sort}&per_page=${per_page}`);
        const data = await res.json();
        return Array.isArray(data) ? data.map(r=>({name:r.name,stars:r.stargazers_count,forks:r.forks_count,url:r.html_url})) : [];
    }catch(e){console.error(e); return [];}
}

