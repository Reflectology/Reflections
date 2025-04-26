// MathJax Configuration
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
    },
    svg: {
        fontCache: 'global'
    }
};

// Load MathJax
(function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
    script.async = true;
    document.head.appendChild(script);
})();

// Function to render equations with MathJax
function renderMathEquations() {
    document.querySelectorAll('.math-eq').forEach(el => {
        const mathContent = el.getAttribute('data-math');
        el.innerHTML = '\\(' + mathContent + '\\)';
    });
    
    // Trigger MathJax to process the new content
    if (window.MathJax) {
        window.MathJax.typeset();
    }
}