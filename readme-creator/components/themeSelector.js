const themeSelect = document.getElementById('theme');
themeSelect.addEventListener('change', ()=>{ document.body.className=themeSelect.value; });
