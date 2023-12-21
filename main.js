const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');


const circles = [];
const rectangles = [];


const colors = {
  green: '#00FF00',
  red: '#FF0000',
};


// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// Create random green circle
function createGreenCircle() {
  const circle = {
    x: getRandomNumber(20, canvas.width - 20),
    y: getRandomNumber(20, canvas.height - 20),
    radius: 20,
    color: colors.green,
    dx: getRandomNumber(-5, 5),
    dy: getRandomNumber(-5, 5),
  };
  circles.push(circle);
}


// Create random red rectangle
function createRedRectangle() {
  const rectangle = {
    x: getRandomNumber(0, canvas.width - 30),
    y: getRandomNumber(0, canvas.height - 30),
    width: 30,
    height: 30,
    color: colors.red,
  };
  rectangles.push(rectangle);
}


// Draw circles on the canvas
function drawCircles() {
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  });
}


// Draw rectangles on the canvas
function drawRectangles() {
  rectangles.forEach(rectangle => {
    ctx.fillStyle = rectangle.color;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  });
}


// Update circle positions and handle collisions
function updateCircles() {
  circles.forEach(circle => {
    circle.x += circle.dx;
    circle.y += circle.dy;


    if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
      circle.dx = -circle.dx;
    }


    if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
      circle.dy = -circle.dy;
    }
  });
}


// Check if a point is inside a circle
function pointInsideCircle(x, y, circle) {
  const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
  return distance <= circle.radius;
}


// Check if a point is inside a rectangle
function pointInsideRectangle(x, y, rectangle) {
  return x >= rectangle.x &&
         x <= rectangle.x + rectangle.width &&
         y >= rectangle.y &&
         y <= rectangle.y + rectangle.height;
}


// Handle mouse click events
function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;


  circles.forEach((circle, index) => {
    if (pointInsideCircle(mouseX, mouseY, circle)) {
      circles.splice(index, 1);
      if (circles.length === 0) {
        alert('Game Over - You WIN!');
        location.reload();
      }
    }
  });


  rectangles.forEach(rectangle => {
    if (pointInsideRectangle(mouseX, mouseY, rectangle)) {
      alert('Game Over - You LOSE!');
      location.reload();
    }
  });
}


// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawCircles();
  drawRectangles();
  updateCircles();


  requestAnimationFrame(gameLoop);
}


// Initialize the game
function init() {
  for (let i = 0; i < 5; i++) {
    createGreenCircle();
    createRedRectangle();
  }


  canvas.addEventListener('click', handleMouseClick);


  gameLoop();
}


// Run the game
init();
