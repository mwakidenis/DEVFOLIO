function generateReadme(data, userInfo = {}) {
    const { username, name, subtitle, funfact, about, toprepos, techstack, gif, theme } = data;
    const repoArray = toprepos.split(',').map(r=>r.trim()).filter(r=>r);
    const techArray = techstack.split(',').map(t=>t.trim()).filter(t=>t);
    const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];

    const techBadges = techArray.map(t=>`![${t}](https://img.shields.io/badge/${encodeURIComponent(t)}-blue)`).join(' ');
    const repoCards = repoArray.map(r=>`[![${r}](https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${r}&theme=${theme})](https://github.com/${username}/${r})`).join(' ');

    const avatarSection = userInfo.avatar ? `![Avatar](${userInfo.avatar}&s=200)` : '';
    const followersBadge = `![Followers](https://img.shields.io/badge/Followers-${userInfo.followers || 0}-blue)`;
    const followingBadge = `![Following](https://img.shields.io/badge/Following-${userInfo.following || 0}-green)`;

    return `# Hi there 👋 I'm ${name || userInfo.name || username}

${subtitle ? '🚀 ' + subtitle : ''}  
${funfact ? '💡 Fun Fact: ' + funfact : ''}

${gif ? `<img src="${gif}" width="200" />` : avatarSection}

---

## 🛠️ Tech Stack
${techBadges}

---

## 📊 GitHub Stats
![Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme})  
![Streaks](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme})  
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme})  
${followersBadge} ${followingBadge}

---

## 🏆 Trophies
![trophy](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&margin-w=15&margin-h=15)

---

## 🔥 Top Repos
${repoCards}

---

## 🌍 Connect With Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://linkedin.com/in/${username})
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://twitter.com/${username})
[![Portfolio](https://img.shields.io/badge/Portfolio-%23000000.svg?logo=firefox&logoColor=white)](https://yourwebsite.com)
[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/${username})

---

## About Me
${about || userInfo.bio || ''}

---

## ✨ Random Quote
"${randomQuote}"
`;
}
