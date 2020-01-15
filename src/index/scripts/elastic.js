import Morph from '../../utilities/scripts/morphSvg.js' ;
let elastic = document.querySelector('#elastic') ;
let elasticTrigger = elastic.querySelector('#elasticTrigger') ;
let morphStage1 = { //init state
    start:{x: elastic.offsetWidth-8,y: 0},
    curve:{cx: 0,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
};
let morphStage2 = { //curve state
    start:{x: elastic.offsetWidth-8,y: 0},
    curve:{cx:-300,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
};
let morphStage3 = { //final state
    start:{x: 30,y: 0},
    curve:{cx:0,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
};
let morphStage4 = { //reverse curve
    start:{x: 30,y: 0},
    curve:{cx:250,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
};
new Morph(
    elastic,elasticTrigger,'0 0 1200 800',
    [
    `M${morphStage1.start.x},${morphStage1.start.y} q${morphStage1.curve.cx},${morphStage1.curve.cy} ${morphStage1.curve.endX},${morphStage1.curve.endY}`,
    `M${morphStage2.start.x},${morphStage2.start.y} q${morphStage2.curve.cx},${morphStage2.curve.cy} ${morphStage2.curve.endX},${morphStage2.curve.endY}`,
    `M${morphStage3.start.x},${morphStage3.start.y} q${morphStage3.curve.cx},${morphStage3.curve.cy} ${morphStage3.curve.endX},${morphStage3.curve.endY}`,
    `M${morphStage4.start.x},${morphStage4.start.y} q${morphStage4.curve.cx},${morphStage4.curve.cy} ${morphStage4.curve.endX},${morphStage4.curve.endY}`
    ],
    {
        duration:700,
        delay:0,
        loop:1,
        direction:'normal'
    }
)