const preview = document.getElementById('preview');
function typePreview(content){
    preview.textContent='';
    let i=0;
    const interval=setInterval(()=>{
        preview.textContent+=content[i];
        i++;
        if(i>=content.length) clearInterval(interval);
    },5);
}
