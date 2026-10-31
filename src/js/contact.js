import emailjs from '@emailjs/browser';

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

function showError(field, msg) { const el = document.querySelector(`[data-error="${field}"]`); if (el) { el.textContent = msg; el.classList.remove('hidden'); } }
function clearError(field) { const el = document.querySelector(`[data-error="${field}"]`); if (el) { el.textContent = ''; el.classList.add('hidden'); } }
function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

console.log('EmailJS env present:', {
  service: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  key: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    ['name','email','subject','projectType','message'].forEach(clearError);
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const projectType = form.projectType.value;
    const message = form.message.value.trim();
    let ok = true;
    if (!name) { showError('name','Full name is required.'); ok = false; }
    if (!email) { showError('email','Email is required.'); ok = false; }
    else if (!validEmail(email)) { showError('email','Enter a valid email address.'); ok = false; }
    if (!subject) { showError('subject','Subject is required.'); ok = false; }
    if (!projectType) { showError('projectType','Please select a project type.'); ok = false; }
    if (!message) { showError('message','Message is required.'); ok = false; }
    if (!ok) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey || publicKey === 'PASTE_PUBLIC_KEY_HERE') {
      status.textContent = 'EmailJS is not configured. Add your Public Key in .env.local.';
      status.className = 'text-sm text-red-600';
      status.classList.remove('hidden');
      return;
    }
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
    try {
      await emailjs.send(serviceId, templateId, { from_name: name, reply_to: email, subject: subject, message: message }, publicKey);
      status.textContent = 'Message sent successfully.';
      status.className = 'text-sm text-primary';
      status.classList.remove('hidden');
      form.reset();
    } catch (err) {
      status.textContent = 'Failed to send message. Please try again later.';
      status.className = 'text-sm text-red-600';
      status.classList.remove('hidden');
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; }
    }
  });
}
