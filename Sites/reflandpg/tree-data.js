// Tree data structure for the pattern evaluation animation
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
    ],
    steps: [
        { focus: ['root'], description: "Start with the full expression: ((p•q)•r)•(p•((p•r)•q))" },
        { focus: ['left', 'right'], description: "Break down into left and right parts" },
        { focus: ['left_left', 'left_right'], description: "Evaluate left part: (p•q)•r" },
        { focus: ['right_left', 'right_right'], description: "Evaluate right part: p•((p•r)•q)" },
        { focus: ['right_right_left', 'right_right_right'], description: "Evaluate inner expression: (p•r)•q" },
        { focus: ['result'], description: "By the reflectology axiom, the result equals r" }
    ]
};