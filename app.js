document.getElementById('waitlistForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const platform = document.getElementById('platformSelect').value;

  if (!name || !email) return;

  const entry = { name, email, platform, timestamp: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem('gigpulse_waitlist') || '[]');
  existing.push(entry);
  localStorage.setItem('gigpulse_waitlist', JSON.stringify(existing));

  document.getElementById('waitlistForm').style.display = 'none';
  const msg = document.getElementById('successMsg');
  msg.style.display = 'block';

  const countEl = document.querySelector('.social-proof');
  if (countEl) countEl.textContent = '✦ 128 freelancers already on the waitlist';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step, .gig-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});