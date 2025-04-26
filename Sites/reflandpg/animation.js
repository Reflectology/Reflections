// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the animation sequence
    initBackgroundAnimation();
    initLogoReveal();
    initScrollBasedAnimations();
    initEquationRender();
    initTreeAnimation();
    initCodeMapping();
});

// Background animation with flowing lines
function initBackgroundAnimation() {
    const bgSvg = document.getElementById('bg-flow');
    const numLines = 20;
    
    // Create flowing background lines
    for (let i = 0; i < numLines; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const startY = Math.random() * 100;
        
        // Create a wavy path
        let d = `M-10,${startY}`;
        for (let x = 0; x <= 110; x += 10) {
            const y = startY + Math.sin(x * 0.05) * 20;
            d += ` L${x},${y}`;
        }
        
        line.setAttribute('d', d);
        line.setAttribute('stroke', 'rgba(160, 160, 160, 0.2)');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('fill', 'none');
        
        bgSvg.appendChild(line);
        
        // Animate the line
        gsap.fromTo(
            line,
            {
                strokeDasharray: 1000,
                strokeDashoffset: 1000,
                opacity: 0
            },
            {
                strokeDashoffset: 0,
                opacity: 0.5,
                duration: 3 + Math.random() * 5,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            }
        );
    }
}

// Logo reveal animation
function initLogoReveal() {
    const logoText = document.querySelector('.logo-text');
    
    // Split text into individual characters for animation
    const chars = logoText.textContent.split('');
    logoText.textContent = '';
    
    chars.forEach((char, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = char;
        tspan.setAttribute('x', `${50 + (index - chars.length / 2) * 6}%`);
        tspan.setAttribute('y', '55%');
        tspan.style.opacity = '0';
        logoText.appendChild(tspan);
    });
    
    // Animate each character
    gsap.to(logoText.querySelectorAll('tspan'), {
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.5
    });
    
    // Add a shimmer effect
    gsap.to(logoText, {
        fillOpacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// Initialize scroll-based animations
function initScrollBasedAnimations() {
    // Equation reveal animation
    ScrollTrigger.create({
        trigger: '#equation-reveal',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateEquation(),
        once: true
    });
    
    // Tooltips animation
    ScrollTrigger.create({
        trigger: '#semantic-layer',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateTooltips(),
        once: true
    });
    
    // Code mapping animation
    ScrollTrigger.create({
        trigger: '#code-mapping',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => highlightCode(),
        once: true
    });
    
    // Pattern evaluation animation
    ScrollTrigger.create({
        trigger: '#pattern-evaluation',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => showDebugOverlay(),
        once: true
    });
    
    // Advanced features animation
    ScrollTrigger.create({
        trigger: '#advanced-features',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateFeatures(),
        once: true
    });
    
    // Call to action animation
    ScrollTrigger.create({
        trigger: '#call-to-action',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateCTA(),
        once: true
    });
}

// Function to animate the equation
function animateEquation() {
    const equationText = document.querySelector('.equation-text');
    const fullEquation = equationText.textContent;
    equationText.textContent = '';
    
    // Create a writing effect for the equation
    let currentText = '';
    const writingSpeed = 50; // ms per character
    
    const writeEquation = () => {
        if (currentText.length < fullEquation.length) {
            currentText += fullEquation[currentText.length];
            equationText.textContent = currentText;
            setTimeout(writeEquation, writingSpeed);
        } else {
            // After equation is written, show variable highlights
            animateVariables();
        }
    };
    
    setTimeout(writeEquation, 500);
}

// Function to animate variable highlights
function animateVariables() {
    const varP = document.getElementById('var-p');
    const varQ = document.getElementById('var-q');
    const varR = document.getElementById('var-r');
    
    gsap.to([varP, varQ, varR], {
        opacity: 1,
        scale: 1,
        stagger: 0.3,
        duration: 0.7,
        ease: 'back.out(1.7)'
    });
    
    // Also highlight the variables in the equation
    const equationText = document.querySelector('.equation-text');
    const equationHTML = equationText.textContent
        .replace(/p/g, '<tspan fill="#ff6b6b">p</tspan>')
        .replace(/q/g, '<tspan fill="#48dbfb">q</tspan>')
        .replace(/r/g, '<tspan fill="#1dd1a1">r</tspan>')
        .replace(/•/g, '<tspan fill="#feca57">•</tspan>');
        
    equationText.innerHTML = equationHTML;
}

// Function to animate tooltips
function animateTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    gsap.fromTo(
        tooltips,
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out'
        }
    );
}

// Function to highlight code and show mappings
function highlightCode() {
    const codeSnippet = document.getElementById('rsc-code-snippet');
    
    // First highlight all of the code
    gsap.fromTo(
        codeSnippet,
        {
            opacity: 0
        },
        {
            opacity: 1,
            duration: 1
        }
    );
    
    // Then highlight specific variable parts
    setTimeout(() => {
        // Find p, q, r in code and add highlight spans
        const codeText = codeSnippet.innerHTML;
        const highlightedCode = codeText
            .replace(/pattern->p/g, '<span class="highlight-p">pattern->p</span>')
            .replace(/pattern->q/g, '<span class="highlight-q">pattern->q</span>')
            .replace(/pattern->r/g, '<span class="highlight-r">pattern->r</span>');
            
        codeSnippet.innerHTML = highlightedCode;
        
        // Add the CSS for the highlights
        const style = document.createElement('style');
        style.textContent = `
            .highlight-p { background-color: rgba(255, 107, 107, 0.3); color: #ff6b6b; }
            .highlight-q { background-color: rgba(72, 219, 251, 0.3); color: #48dbfb; }
            .highlight-r { background-color: rgba(29, 209, 161, 0.3); color: #1dd1a1; }
        `;
        document.head.appendChild(style);
        
        // Animate the connecting lines
        animateConnectingLines();
    }, 1500);
}

// Function to animate connecting lines between equation and code
function animateConnectingLines() {
    const mapP = document.getElementById('map-p');
    const mapQ = document.getElementById('map-q');
    const mapR = document.getElementById('map-r');
    
    // Set positions for the lines (adjusted based on your layout)
    mapP.style.top = '40%';
    mapP.style.left = '20%';
    mapP.style.width = '200px';
    mapP.style.transform = 'rotate(30deg)';
    
    mapQ.style.top = '50%';
    mapQ.style.left = '40%';
    mapQ.style.width = '150px';
    mapQ.style.transform = 'rotate(-20deg)';
    
    mapR.style.top = '60%';
    mapR.style.left = '60%';
    mapR.style.width = '180px';
    mapR.style.transform = 'rotate(10deg)';
    
    // Animate the lines
    gsap.to([mapP, mapQ, mapR], {
        scaleX: 1,
        opacity: 0.8,
        stagger: 0.3,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Add animated dots traveling along the lines
    [mapP, mapQ, mapR].forEach((line, index) => {
        const dot = document.createElement('div');
        dot.className = 'mapping-dot';
        dot.style.position = 'absolute';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = index === 0 ? '#ff6b6b' : index === 1 ? '#48dbfb' : '#1dd1a1';
        
        document.getElementById('code-mapping-overlay').appendChild(dot);
        
        // Animate the dot along the line
        gsap.to(dot, {
            motionPath: {
                path: line,
                align: line,
                alignOrigin: [0.5, 0.5]
            },
            duration: 2,
            repeat: -1,
            ease: 'none',
            delay: index * 0.5 + 1
        });
    });
}

// Function to render an evaluation tree
function initEquationRender() {
    const svg = document.getElementById('eval-tree');
    
    // Create nodes and edges for the tree
    const treeData = {
        nodes: [
            { id: 'root', x: 400, y: 50, text: '((p•q)•r)•(p•((p•r)•q))' },
            { id: 'left', x: 200, y: 150, text: '(p•q)•r' },
            { id: 'right', x: 600, y: 150, text: 'p•((p•r)•q)' },
            { id: 'left_left', x: 100, y: 250, text: 'p•q' },
            { id: 'left_right', x: 300, y: 250, text: 'r' },
            { id: 'right_left', x: 500, y: 250, text: 'p' },
            { id: 'right_right', x: 700, y: 250, text: '(p•r)•q' },
            { id: 'right_right_left', x: 600, y: 350, text: 'p•r' },
            { id: 'right_right_right', x: 800, y: 350, text: 'q' },
            { id: 'p1', x: 50, y: 350, text: 'p' },
            { id: 'q1', x: 150, y: 350, text: 'q' },
            { id: 'p2', x: 550, y: 450, text: 'p' },
            { id: 'r2', x: 650, y: 450, text: 'r' },
            { id: 'result', x: 400, y: 500, text: 'r' }
        ],
        edges: [
            { source: 'root', target: 'left' },
            { source: 'root', target: 'right' },
            { source: 'left', target: 'left_left' },
            { source: 'left', target: 'left_right' },
            { source: 'right', target: 'right_left' },
            { source: 'right', target: 'right_right' },
            { source: 'right_right', target: 'right_right_left' },
            { source: 'right_right', target: 'right_right_right' },
            { source: 'left_left', target: 'p1' },
            { source: 'left_left', target: 'q1' },
            { source: 'right_right_left', target: 'p2' },
            { source: 'right_right_left', target: 'r2' },
            { source: 'root', target: 'result', dashed: true }
        ]
    };
    
    // Draw the edges first
    treeData.edges.forEach(edge => {
        const sourceNode = treeData.nodes.find(n => n.id === edge.source);
        const targetNode = treeData.nodes.find(n => n.id === edge.target);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'edge');
        path.setAttribute('d', `M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`);
        
        if (edge.dashed) {
            path.setAttribute('stroke-dasharray', '5,5');
            path.setAttribute('stroke', '#1dd1a1');
        }
        
        svg.appendChild(path);
    });
    
    // Draw the nodes
    treeData.nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'node');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 30);
        
        if (node.id === 'result') {
            circle.setAttribute('fill', 'rgba(29, 209, 161, 0.2)');
            circle.setAttribute('stroke', '#1dd1a1');
        }
        
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('class', 'node-text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y);
        
        // For variables, use colored text
        if (node.text === 'p') {
            text.setAttribute('fill', '#ff6b6b');
        } else if (node.text === 'q') {
            text.setAttribute('fill', '#48dbfb');
        } else if (node.text === 'r') {
            text.setAttribute('fill', '#1dd1a1');
        }
        
        text.textContent = node.text;
        svg.appendChild(text);
    });
}

// Function to animate the evaluation tree
function initTreeAnimation() {
    // Hide all nodes and edges initially
    const nodes = document.querySelectorAll('.node, .node-text');
    const edges = document.querySelectorAll('.edge');
    
    gsap.set([...nodes, ...edges], { opacity: 0 });
    
    ScrollTrigger.create({
        trigger: '#pattern-evaluation',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
            // Animate edges first
            gsap.to(edges, {
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            // Then animate nodes
            gsap.to(nodes, {
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out',
                delay: edges.length * 0.05
            });
            
            // After tree is shown, animate the collapse
            setTimeout(animateTreeCollapse, (edges.length + nodes.length) * 50 + 1000);
        },
        once: true
    });
}

// Function to animate the tree collapsing to result
function animateTreeCollapse() {
    const resultNode = document.querySelectorAll('.node')[treeData.nodes.findIndex(n => n.id === 'result')];
    const resultNodePos = { x: 400, y: 500 };
    
    // Animate other nodes collapsing into result
    const otherNodes = Array.from(document.querySelectorAll('.node')).filter((_, i) => 
        treeData.nodes[i].id !== 'result'
    );
    
    gsap.to(otherNodes, {
        cx: resultNodePos.x,
        cy: resultNodePos.y,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.in'
    });
    
    // Animate node texts
    const otherTexts = Array.from(document.querySelectorAll('.node-text')).filter((_, i) => 
        treeData.nodes[i].id !== 'result'
    );
    
    gsap.to(otherTexts, {
        x: resultNodePos.x,
        y: resultNodePos.y,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.in'
    });
    
    // Fade out edges
    gsap.to(document.querySelectorAll('.edge'), {
        opacity: 0,
        duration: 0.5
    });
    
    // Highlight result
    gsap.to(resultNode, {
        r: 50,
        duration: 1,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Then show debug overlay
    setTimeout(showDebugOverlay, 2000);
}

// Function to show the debug overlay
function showDebugOverlay() {
    const debugOverlay = document.getElementById('debug-overlay');
    debugOverlay.classList.remove('hidden');
    debugOverlay.classList.add('visible');
    
    const steps = document.querySelectorAll('.debug-step');
    gsap.fromTo(
        steps,
        {
            opacity: 0,
            y: 10
        },
        {
            opacity: 1,
            y: 0,
            stagger: 1,
            duration: 0.5,
            ease: 'power2.out'
        }
    );
}

// Function to animate advanced features
function animateFeatures() {
    const features = document.querySelectorAll('.feature');
    
    gsap.to(features, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Add some subtle hover animation to features
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            gsap.to(feature, {
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                duration: 0.3
            });
        });
        
        feature.addEventListener('mouseleave', () => {
            gsap.to(feature, {
                scale: 1,
                boxShadow: 'none',
                duration: 0.3
            });
        });
    });
}

// Function to animate the call to action
function animateCTA() {
    // Animate logo
    const ctaLogo = document.querySelector('#cta-logo .logo-text');
    gsap.fromTo(
        ctaLogo,
        {
            opacity: 0,
            scale: 0.8
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        }
    );
    
    // Animate equation
    const ctaEquation = document.querySelector('#cta-equation .equation-text');
    gsap.fromTo(
        ctaEquation,
        {
            opacity: 0,
            y: -20
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        }
    );
    
    // Animate tagline
    const tagline = document.getElementById('tagline');
    gsap.fromTo(
        tagline,
        {
            opacity: 0,
            y: -20
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1,
            ease: 'power3.out'
        }
    );
    
    // Animate buttons
    const buttons = document.querySelectorAll('.cta-button');
    gsap.fromTo(
        buttons,
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            delay: 1.5,
            ease: 'power3.out'
        }
    );
    
    // Add button hover animations
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                backgroundColor: '#a0a0a0',
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                backgroundColor: '#2d2d2d',
                duration: 0.3
            });
        });
    });
}