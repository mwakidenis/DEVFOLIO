const form=document.getElementById('readmeForm');
const copyBtn=document.getElementById('copyBtn');
const downloadBtn=document.getElementById('downloadBtn');
const surpriseBtn=document.getElementById('surpriseBtn');

// Click sound
function playClick(){ const audio=new Audio('sounds/click.mp3'); audio.play(); }

// GIF drag & drop
const gifDropArea=document.getElementById('gifDropArea');
const gifInput=document.getElementById('gif');
gifDropArea.addEventListener('dragover', e=>{ e.preventDefault(); gifDropArea.classList.add('dragover'); });
gifDropArea.addEventListener('dragleave', e=>{ gifDropArea.classList.remove('dragover'); });
gifDropArea.addEventListener('drop', e=>{
    e.preventDefault(); gifDropArea.classList.remove('dragover');
    const file=e.dataTransfer.files[0];
    if(file && file.type.startsWith('image/')){
        const reader=new FileReader();
        reader.onload=()=>{ gifInput.value=reader.result; };
        reader.readAsDataURL(file);
    }
});

// Tech badge live preview
const techInput=document.getElementById('techstack');
const techPreview=document.getElementById('techPreview');
techInput.addEventListener('input', ()=>{
    const techs=techInput.value.split(',').map(t=>t.trim()).filter(t=>t);
    techPreview.innerHTML=techs.map(t=>`<img src="https://img.shields.io/badge/${encodeURIComponent(t)}-blue" alt="${t}"/>`).join(' ');
});

// Form submit
form.addEventListener('submit', async e=>{
    e.preventDefault(); playClick();
    const username=document.getElementById('username').value;
    let toprepos=document.getElementById('toprepos').value;
    if(!toprepos) toprepos=(await fetchTopRepos(username)).join(',');

    const userInfo = await fetchUserInfo(username);

    const data={
        username,
        name: document.getElementById('name').value,
        subtitle: document.getElementById('subtitle').value,
        funfact: document.getElementById('funfact').value,
        about: document.getElementById('about').value,
        toprepos,
        techstack: document.getElementById('techstack').value,
        gif: document.getElementById('gif').value,
        theme: document.getElementById('theme').value
    };
    document.body.className=data.theme;
    const readme=generateReadme(data,userInfo);
    typePreview(readme);
    playConfetti();
});

// Copy & Download
copyBtn.addEventListener('click', ()=>{
    playClick(); navigator.clipboard.writeText(preview.textContent); alert('README copied!');
});
downloadBtn.addEventListener('click', ()=>{
    playClick();
    const blob=new Blob([preview.textContent],{type:"text/markdown"});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download="README.md"; a.click();
});

// Surprise Me
surpriseBtn.addEventListener('click', ()=>{
    playClick();
    const emojis=["🚀","🎉","💻","😎","🌟","🐱","🔥","🤖"];
    document.getElementById('subtitle').value=emojis[Math.floor(Math.random()*emojis.length)]+" Surprise Developer!";
});
