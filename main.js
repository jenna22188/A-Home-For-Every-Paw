/* global gsap, ScrollTrigger, SplitText, Zoomora */ //recognises the plugins so it is defined and doesn't cause error
//Navigation Hamburger Menu Function
const hamburger = document.querySelector(".nav-hamburger");
const linksContainer = document.querySelector(".nav-menu");
const links = document.querySelector(".nav-links");

hamburger. addEventListener("click", function(event) {
  event.preventDefault();      //prevents hamburger menu from jumping to the homepage when clicked
  linksContainer.classList.toggle("active");
  hamburger.classList. toggle("active");
});

window.addEventListener("resize", function() {  //resizes the menu 
  if (window.matchMedia("(max-width: 550px)").matches) {
    closeMenu();
  }
});

if (window.matchMedia("(max-width: 550px)").matches) {
  closeMenu();
}

function closeMenu() {
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      hamburger.classList.remove("active"); //when closing the hamburger menu it should not become active
    });
  });
}

//Scroll Arrow Function
document.getElementById("scroll-arrow").addEventListener("click", function(e) {
  e.preventDefault(); // stop link from reloading page
  window.scrollBy({
    top: window.innerHeight,   // scroll down one full screen height
    behavior: "smooth"         // smooth scrolling
  });
});


//Zoomora Gallery Installation
new Zoomora({               //will cause an error due to using "new" but is required in the zoomora installation in the website
  selector: '[data-zoomora]',
  showThumbnails: true,
  showFullscreen: true,
  showZoom: true,
  transition: 'fade'
});

//GSAP animation plugins
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

let split = SplitText.create("h1", { type: "words" }); //split text words animation

gsap.from(split.words, {
  duration: 1, 
  y: 100,       // animate from 100px below
  autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
  stagger: {   //utilising stagger animation
    amount:0.2,
    from: "centre"
  },
});

let split1 = SplitText.create(".title-desc", { type: "words" });

gsap.from(split1.words, {
  duration: 1, 
  y: 100,       
  autoAlpha: 0, 
  stagger: 0.4 // 0.04 seconds between each words
});


//Donate Button Sound Effects
const navSound = new Audio("sound/ui-navigation-sound.mp3");// integrating the sound in js
const popSound = new Audio("sound/ui-pop-sound.mp3");

const container = document.querySelector('.animation-button', '.alert-toast'); // shoelace ui animation and alert in donate page
const animation = container.querySelector('sl-animation');
const button = container.querySelector('sl-button');

if (button && animation) {
  button.addEventListener('click', function() { // when use clicks there will be an alert
    animation.play = true;
    navSound.currentTime = 0;
    navSound.play();
    if (typeof alert !== 'undefined' && alert.toast) {
      alert.toast();
    }
  });
}


['primary'].map(function(variant) { // shoelace primary will play with that button 
  const button = container ? container.querySelector('sl-button[variant="' + variant + '"]') : null;
  const alertElem = container ? container.querySelector('sl-alert[variant="' + variant + '"]') : null;
  if (button && alertElem) {
    button.addEventListener('click', function() { alertElem.toast(); });
  }
});


const button3 = document.getElementById("donateButton"); // donate button on home page 
if (button3) {
  button3.addEventListener("click", function() { // on click will play the pop sound effect
    popSound.currentTime = 0;
    popSound.play();
  });
} else {
  console.warn("donateButton not found in the DOM");
}

//About Page Scroll Trigger Animation using GSAP
let tl1 = gsap.timeline({  //utilised a timeline for transitions in order
  scrollTrigger: {
    trigger: '#about',
    pin: true, // pins trigger the element while active
    start: 'top top', //trigger hits when at the top of the viewport
    end: '+=500', // ends after scrolling 500px beyond the start
    scrub: 3, //takes 3 seconds to "catch up" to the scrollbar
    snap: {
      snapTo: 'labels', // snap to the closest label in the timeline
      duration: { min: 0.2, max: 3 }, 
      delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
      ease: 'power1.inOut' // the ease of the snap animation
    }
  }
});

// adding animations and labels to the timeline
tl1.addLabel('start')
.from('.dog-eye img', {
  rotation: 360,   // rotate full circle
  duration: 5,     // how long animation lasts
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.dog-eye img',   
    start: 'top 80%',     // when the top of the element hits 80% of viewport
    toggleActions: 'restart pause reverse play' // order: onEnter, onLeave, onEnterBack, onLeaveBack
  }})

  .from('h2', { scale: 0.3, ease: "power3.out", autoAlpha: 0, opacity:0 , duration:5 })
  .addLabel('about-movein')
  .from('h2', {  y: 150, ease: "power1.inOut", duration:3  })
  .addLabel('about-moveout')
  .from('.about-desc', { scale: 0.3, autoAlpha: 0, duration:4  })
  .addLabel('end');


//Issue Page Scroll Trigger using GSAP
let tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.container-issue-support',
      pin: true, 
      start: 'top 10%', //the 10% prevents pushing the whole content up to the top of the screen
      end: '+=600', 
      scrub: 2, 
      snap: {
        snapTo: 'labels', 
        duration: { min: 0.2, max: 3 }, 
        delay: 0.2, 
        ease: 'power1.inOut' 
      }
    }
  });

 //Issue Page Animation Using Timeline
  tl.addLabel('start')
    .from('h3', { scale: 0.3, autoAlpha: 0, duration:5 })
    .addLabel('appear')
    .from('.issue-desc', { scale: 0.3, autoAlpha: 0, duration:3  })
    .addLabel('appear1')
    .from('.subsection-container > div', {
      y: 100,
      opacity: 0,
      scale: 0.7,
      ease: 'back.out(1.4)',
      duration: 2,
      stagger: {
        amount: 5,
        from: 'start',

      }})
      .fromTo('.issue-images img', 
        { filter: 'brightness(1.4)' }, // starting brightness
        { filter: 'brightness(1)',    // gets dimmer
          duration: 0.1,
          ease: 'power2.inOut' })
    
    .addLabel('appear2')
    .from('.para-section2', { scale: 0.3, autoAlpha: 0, duration:1 }, "-=1.5") // "-=1.5" plays ealier so there is no delay when scrolling
    .addLabel('end');



//Support Page Number Counter Animation
document.querySelectorAll(".counter").forEach(function (counter) {
  let target = +counter.dataset.target;

  gsap.fromTo(counter,
    { innerText: 0 },
    {
      innerText: target,
      duration: 3,
      ease: "power2.out",
      snap: { innerText: 1 }, //makes it count in whole numbers
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: function() {
        counter.innerText = Math.floor(counter.innerText);
      }
    }
  );
});

//Benefits Page GSAP Animation
let split2 = SplitText.create(".title3", { type: "words" });

// Animates when section comes into view
gsap.from(split2.words, {
  duration: 1,
  y: 100,
  autoAlpha: 0,
  stagger: 0.2,
  ease: "power2.out",
    scrollTrigger: {
    trigger: ".title3",   //element that triggers animation
    start: "top 80%",            
    end: "bottom 50%",          
    toggleActions: "play none none reverse", 
    markers: false            
  }
});


// Donate Page, SVG Animation overlay for pet rescue logo
gsap.to("#pulse-circle", {
  scale: 1.3,
  transformOrigin: "center",
  duration: 1,
  repeat: -1,   // loops forever
  yoyo: true,   // goes back and forth
  ease: "power1.inOut"
  
});


//Adopt Page Dog Gallery Filter
const select = document.querySelector('#dog-filter');
const items = document.querySelectorAll('.gallery-item');

select.addEventListener('sl-change', function (event) {
  const selected = event.target.value.toLowerCase(); //Recognises the selected dog

  items.forEach(function(item) {
    const dog = item.dataset.dog.toLowerCase();

    //If 'all' selected, otherwise match data-dog
    if (selected === 'all' || dog === selected) {
      item.style.display = 'block';
      item.style.opacity = 1;
      item.style.transform = 'scale(1)';
    } else {
      item.style.opacity = 0;
      item.style.transform = 'scale(0.9)';
      setTimeout(function() { item.style.display = 'none'; }, 300);//Fades out smoothly
    }
  });
});



