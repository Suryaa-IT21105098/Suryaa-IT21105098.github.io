'use strict';

// SIDE NAVBAR
const icons = document.querySelectorAll('.icons span');

const clearActive = function () {
  icons.forEach((icon) => {
    icon.style.borderBottom = `none`;
    icon.classList.remove('active');
  });
};

icons.forEach((icon) => {
  icon.addEventListener('click', () => {
    clearActive();
    icon.style.borderBottom = `2px solid cyan`;
    icon.classList.add('active');
  });
});

// Mouse Hover Animation
const c = document.getElementById('c');
const ctx = c.getContext('2d');

const WIDTH = (c.width = window.innerWidth);
const HEIGHT = (c.height = window.innerHeight);
const mouse = {
  x: 0,
  y: 0,
  isMoved: false,
};

const Particle = function () {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.a = 0;
  this.life = 0;
  this.radius = Math.random() * 5;
};

Particle.prototype = {
  constructor: Particle,
  update: function () {
    if (this.life > 0) {
      this.life -= 2;
      if (this.life < 50) {
        this.vx += Math.random() * 4 - 2;
        this.vy += Math.random() * 4 - 2;
        this.vx *= 0.9;
        this.vy *= 0.9;
        this.x += this.vx;
        this.y += this.vy;
        this.a = this.life / 50;
      }
    }
  },
  render: function (ctx) {
    ctx.save();
    ctx.fillStyle =
      'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },
  reset: function (tx, ty) {
    this.x = tx;
    this.y = ty;
    this.vx = Math.random() * 4 - 1;
    this.vy = Math.random() * 4 - 1;
    this.life = 150;
    this.a = 1;
    this.g = Math.round(255 * (this.x / WIDTH));
    this.b = Math.round(255 * (this.y / HEIGHT));
    this.radius = Math.random() * 5;
  },
};

let particles = [];
let particle = null;
let particleCount = 500;
let tx = 0;
let ty = HEIGHT / 2;
let idx = 0;
let temp = {
  vx: Math.random() * 4 - 2,
  vy: Math.random() * 4 - 2,
  x: WIDTH / 2,
  y: HEIGHT / 2,
};

for (var i = 0; i < particleCount; i++) {
  particle = new Particle();
  particles.push(particle);
}

function spawn(target) {
  tx += (target.x - tx) * 0.2;
  ty += (target.y - ty) * 0.2;

  particles[idx].reset(tx, ty);
  if (++idx >= particles.length) idx = 0;
}

c.addEventListener('mousemove', function (e) {
  let rect = c.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
  mouse.isMoved = true;

  spawn(mouse);
});

requestAnimationFrame(function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  if (!mouse.isMoved) {
    temp.vx += Math.random() * 4 - 2;
    temp.vy += Math.random() * 4 - 2;
    temp.vx *= 0.98;
    temp.vy *= 0.98;
    temp.x += temp.vx;
    temp.y += temp.vy;
    if (temp.x > WIDTH) {
      temp.x = WIDTH;
      temp.vx *= -1;
    }
    if (temp.x < 0) {
      temp.x = 0;
      temp.vx *= -1;
    }
    if (temp.y > HEIGHT) {
      temp.y = HEIGHT;
      temp.vy *= -1;
    }
    if (temp.y < 0) {
      temp.y = 0;
      temp.vy *= -1;
    }
    spawn(temp);
  }

  for (let i = 0; i < particleCount; i++) {
    particle = particles[i];
    particle.update();
    particle.render(ctx);
  }
});


// LinkedIn and Email Functionality
document.querySelectorAll('.social-link .linkedin').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const linkedInUrl = event.currentTarget.getAttribute('data-linkedin');
    window.open(linkedInUrl, '_blank');
  });
});

document.querySelectorAll('.social-link .email').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const email = event.currentTarget.getAttribute('data-email');
    window.location.href = `mailto:${email}`;
  });
});


// Skills 3D animations
$(document).ready(function () {
  const entries = [
    { label: 'JavaScript' },
    { label: 'HTML5' },
    { label: 'CSS3' },
    { label: 'Bootstrap5' },
    { label: 'BEM' },
    { label: 'Git' },
    { label: 'Github' },
    { label: 'SASS' },
    { label: 'Python3' },
    { label: 'React.js' },
    { label: 'Redux' },
    { label: '@toolkit' },
    { label: 'OOP' },
    { label: 'JSON' },
    { label: 'ES5/ES6' },
    { label: 'npm' },
    { label: 'Ajax' },
    { label: 'Figma' },
    { label: 'Webpack' },
    { label: 'Jest' },
    { label: 'Vue' },
    { label: 'Vuex' },
    { label: 'Nuxt' },
    { label: 'Ruby' },
    { label: 'Ruby on Rails' },
    { label: 'RSpec' },
    { label: 'PostgreSQL' },
  ];

  const settings = {
    entries: entries,
    width: 640,
    height: 480,
    raduis: '65%',
    raduisMin: 75,
    bgDraw: true,
    bgColor: '#FFFEFEFE',
    opacityOver: 1.0,
    opacityOut: 0.05,
    opacitySpeed: 6,
    fov: 800,
    speed: 1.2,
    fontFamily: 'Courier, Arial, sans-serif',
    fontSize: '1.5rem',
    fontColor: 'black',
  };

  $('#tag').svg3DTagCloud(settings);
});

// Contact me Form
const form = document.getElementById('my-form');

async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById('status');
  const data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      status.classList.add('success');
      status.innerHTML = 'Thanks for your submission!';
      form.reset();
    })
    .catch((error) => {
      status.classList.add('error');
      status.innerHTML = 'Oops! There was a problem submitting your form';
    });
}

window.addEventListener("scroll", () => {
  const aboutInfo = document.querySelector(".about__info");
  const aboutPosition = aboutInfo.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (aboutPosition < screenPosition) {
      aboutInfo.classList.add("about_scroll");
  }
});



// Disable inspect element

// Disable Right Click
// document.addEventListener("contextmenu", (e) => e.preventDefault());

// Disable keyboard
document.onkeydown = function (e) {
  if (e.code == 'F12') return false;
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') return false;
  if (e.ctrlKey && e.shiftKey && e.code == 'KeyJ') return false;
  if (e.ctrlKey && e.code == 'KeyU') return false;
};


// My Projects
const projects = [
  {
    title: 'Topic Assessment',
    description:
      'Submitted on 2024/01/27',
    Download: 'https://drive.google.com/drive/folders/14KMxOdWSNFpQZrJk1JoYMhOwIlJqDQJu',
  },
  {
    title: 'Project Charter',
    description:
    'Yet to be submitted, link will be updated soon',
    Download: 'https://drive.google.com/drive/folders/1UtgKlC9Hkx1GScoqg4rws2aX2gJARRdM',
  },
  {
    title: 'Project Proposal',
    description:
    'Submitted on 2024/01/29',
    Download: 'https://drive.google.com/drive/folders/1DgY45inAE2L1ArjL1So1i4EGavtGeTRK',
  },
  {
    title: 'Status Documents I',
    description:
    'Submitted on 2024/05/08',
    Download: 'https://drive.google.com/drive/folders/1GYbXkd6M-TcmwKNBQsJH08hkXALQ1st7',
  },
  {
    title: 'Status Documents II',
    description:
    'Submitted on 2024/09/11',
    Download: 'https://drive.google.com/drive/folders/19b9luAd5fmTLpDzhQ-WOKUihChXspy5d',
  },
  {
    title: 'Research Paper',
    description:
    'Submitted on 2024/06/15',
    Download: 'https://drive.google.com/drive/folders/1V7D1JzSqGy4X0Bobm4GcQOjVnQUeNDu8',
  },
  {
    title: 'Final Report',
    description:
    'Yet to be submitted, link will be updated soon',
    Download: 'https://drive.google.com/drive/folders/19GWTCKRRNUsFaiJLzkws07AmO5mX_PTV',
  },
  {
    title: 'Poster',
    description:
    'Yet to be submitted, link will be updated soon',
    Download: 'https://drive.google.com/drive/folders/1HQ1erSFy6KopE0uRWAKlOsVd_eSLZgwq',
  },
  {
    title: 'Project Proposal - PPT',
    description:
    'Yet to be submitted, link will be updated soon',
    Download: 'https://drive.google.com/drive/folders/1ybaNiLccb3Y1loF4yV99maFog-cHapwW',
  },
  {
    title: 'Progress Presentation I - PPT',
    description:
    'Submitted on 2024/05/08',
    Download: 'https://drive.google.com/drive/folders/1jl2ccGtuIESBKkY5yza28kZpw4yba66U',
  },
  {
    title: 'Progress Presentation II - PPT',
    description:
    'Submitted on 2024/09/11',
    Download: 'https://drive.google.com/drive/folders/1zATH33fQYk4Q_DzdSZrv15MZ8N7E4tpN',
  },
  {
    title: 'Final Presentation - PPT',
    description:
    'Yet to be submitted, link will be updated soon',
    Download: 'https://drive.google.com/drive/folders/17vC62h7Rv0he2PGssVD1iw2Yr08ja0YF',
  },
  
];

const cards = document.querySelector('.cards');

const createCard = (projects) => {
  projects.forEach((project) => {
    let html = `
              <div class="card">
                <div class="face face1">
                    <div class="content">
                        <h3>${project.title}</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <p>${project.description}</p>
                        <a href="${project.Download}" target="_blank"
                            class="btnCard">Download</a>
                    </div>
                </div>
            </div>`;
    cards.innerHTML += html;
  });
};

createCard(projects);
