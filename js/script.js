'use strict';
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const year=document.getElementById('year');year.textContent=new Date().getFullYear();
const form=document.getElementById('contact-form');
const fields={name:document.getElementById('name'),email:document.getElementById('email'),message:document.getElementById('message')};
function validate(key){const field=fields[key],value=field.value.trim();let error='';if(!value)error='This field is required.';else if(key==='name'&&value.length<2)error='Please enter at least 2 characters.';else if(key==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))error='Enter a valid email address.';else if(key==='message'&&value.length<10)error='Please enter at least 10 characters.';document.getElementById(key+'-error').textContent=error;field.setAttribute('aria-invalid',String(Boolean(error)));field.setAttribute('aria-describedby',key+'-error');return !error;}
Object.keys(fields).forEach(key=>fields[key].addEventListener('blur',()=>validate(key)));
form.addEventListener('submit',e=>{e.preventDefault();const valid=Object.keys(fields).map(validate).every(Boolean);const status=document.getElementById('form-status');if(!valid){status.textContent='Please correct the highlighted fields.';status.style.color='#a73535';Object.values(fields).find(field=>field.getAttribute('aria-invalid')==='true')?.focus();return;}status.textContent='Your details are valid. This is a demo form: no message was sent. Connect a backend or form service to receive inquiries.';status.style.color='#315d47';form.reset();Object.values(fields).forEach(field=>field.removeAttribute('aria-invalid'));});
