// DOM Elements
const themeToggle = document.getElementById('modeToggle');
const themeIcon = themeToggle.querySelector('i');
const htmlElement = document.documentElement;
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Initialize current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Theme toggle functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
}

function enableDarkMode() {
  htmlElement.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
  htmlElement.removeAttribute('data-theme');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  localStorage.setItem('theme', 'light');
}

function toggleTheme() {
  if (htmlElement.getAttribute('data-theme') === 'dark') {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

// Listen for system color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    e.matches ? enableDarkMode() : enableLightMode();
  }
});

// Initialize theme when page loads
initializeTheme();

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width') || bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('skills-container')) {
        animateSkillBars();
      }
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.1 });

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});