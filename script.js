
(function(){
  const t=document.querySelector('[data-theme-toggle]'),r=document.documentElement;
  let d=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  r.setAttribute('data-theme',d);
  if(t)t.addEventListener('click',()=>{
    d=d==='dark'?'light':'dark';r.setAttribute('data-theme',d);
    t.innerHTML=d==='dark'
      ?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      :'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  });
})();

let currentLang='nl';
function setLang(lang){
  currentLang=lang;
  document.documentElement.lang={nl:'nl',en:'en',ro:'ro'}[lang]||'nl';
  document.querySelectorAll('[data-lang-content]').forEach(el=>{
    const v=el.getAttribute('data-'+lang);if(v!==null)el.innerHTML=v;
  });
  document.querySelectorAll('[data-lang-placeholder]').forEach(el=>{
    const v=el.getAttribute('data-'+lang);if(v!==null)el.placeholder=v;
  });
  document.querySelectorAll('[data-lang-option]').forEach(el=>{
    const v=el.getAttribute('data-'+lang);if(v!==null)el.textContent=v;
  });
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.classList.toggle('active',btn.getAttribute('data-lang')===lang);
  });
}
document.querySelectorAll('.lang-btn').forEach(btn=>{
  btn.addEventListener('click',()=>setLang(btn.getAttribute('data-lang')));
});
function handleForm(e){
  e.preventDefault();
  const msg=document.getElementById('form-msg');
  const t={nl:'✓ Bedankt — wij nemen spoedig contact op.',en:'✓ Thank you — we will be in touch shortly.',ro:'✓ Vă mulțumim — vă vom contacta în curând.'};
  msg.textContent=t[currentLang];msg.style.display='block';e.target.reset();
}

function openLegal(){
  const m=document.getElementById('legal-modal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
  setLang(currentLang);
}
function closeLegal(){
  document.getElementById('legal-modal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('DOMContentLoaded',function(){
  document.getElementById('legal-modal').addEventListener('click',function(e){
    if(e.target===this)closeLegal();
  });
});
function openPrivacy(){{
  const m=document.getElementById('privacy-modal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
  // Apply current language
  setLang(currentLang);
}}
function closePrivacy(){{
  document.getElementById('privacy-modal').classList.remove('open');
  document.body.style.overflow='';
}}
document.getElementById('privacy-modal').addEventListener('click',function(e){{
  if(e.target===this)closePrivacy();
}});
document.addEventListener('keydown',function(e){{
  if(e.key==='Escape'){closePrivacy();closeLegal();}
}});


  // Formspree AJAX submit
  (function(){
    var form = document.getElementById('contact-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var msg = document.getElementById('form-msg');
      if(btn) btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(resp){
        if(resp.ok){
          msg.style.display = 'block';
          form.reset();
        } else {
          msg.textContent = '⚠ Er is iets misgegaan. Probeer opnieuw.';
          msg.style.display = 'block';
          msg.style.color = 'var(--color-error)';
        }
        if(btn) btn.disabled = false;
      }).catch(function(){
        msg.textContent = '⚠ Geen verbinding. Probeer opnieuw.';
        msg.style.display = 'block';
        msg.style.color = 'var(--color-error)';
        if(btn) btn.disabled = false;
      });
    });
  })();
