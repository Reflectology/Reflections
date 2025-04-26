// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the canvas background
  initMathPattern();
  
  // Trigger animations
  setTimeout(startAnimations, 100);
  
  // Highlight syntax in formulas
  highlightSyntax();
  
  // Add event listeners
  document.querySelector('.cta-button').addEventListener('click', function() {
    alert('Reflectology exploration starting...');
  });
});

// Start animations in sequence
function startAnimations() {
  // Animate header section
  document.querySelector('.header-section').classList.add('animate');
  
  // Animate math foundation after a delay
  setTimeout(() => {
    document.querySelector('.math-foundation').classList.add('animate');
  }, 600);
  
  // Animate key statement
  setTimeout(() => {
    document.querySelector('.key-statement').classList.add('animate');
  }, 1200);
  
  // Animate CTA
  setTimeout(() => {
    document.querySelector('.cta-section').classList.add('animate');
  }, 1800);
  
  // Animate footer
  setTimeout(() => {
    document.querySelector('.math-footer').classList.add('animate');
  }, 2400);
}

// Initialize the mathematical background pattern
function initMathPattern() {
  const canvas = document.getElementById('mathPattern');
  const ctx = canvas.getContext('2d');
  
  // Set canvas to full window size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawPattern();
  }
  
  // Draw the mathematical pattern
  function drawPattern() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    
    const gridSize = 40;
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw mathematical symbols
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    
    const symbols = [
      '((p•q)•r)•(p•((p•r)•q))=r',
      'G=θ(Ω)-C',
      'Orbit(ω)',
      '∑(g⋅ω)',
      'CF(ω)',
      'g∈G',
      'ω*=argmax₍ω∈CF(Ω)₎G(ω)'
    ];
    
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      ctx.fillText(symbol, x, y);
    }
    
    // Draw connecting lines
    ctx.strokeStyle = 'rgba(100, 150, 255, 0.03)';
    for (let i = 0; i < 20; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = x1 + (Math.random() - 0.5) * 400;
      const y2 = y1 + (Math.random() - 0.5) * 400;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  
  // Initialize canvas
  resizeCanvas();
  
  // Handle window resize
  window.addEventListener('resize', resizeCanvas);
  
  // Create subtle animation for the background
  let frameCount = 0;
  function animateBackground() {
    if (frameCount % 100 === 0) { // Redraw occasionally for subtle movement
      drawPattern();
    }
    frameCount++;
    requestAnimationFrame(animateBackground);
  }
  
  animateBackground();
}

// Highlight syntax in mathematical formulas
function highlightSyntax() {
  const formulas = document.querySelectorAll('.axiom-formula');
  
  formulas.forEach(formula => {
    let html = formula.innerHTML;
    
    // Replace variables with highlighted span
    html = html.replace(/([pqrω][\*₁₂ₙ]?)/g, '<span class="variable">$1</span>');
    
    // Replace operators
    html = html.replace(/([•⋅=\{\}\(\)|])/g, '<span class="operator">$1</span>');
    
    // Replace sets and special symbols
    html = html.replace(/(Ω|Orbit|G|CF|argmin|argmax|∈|θ)/g, '<span class="set">$1</span>');
    
    formula.innerHTML = html;
  });
}