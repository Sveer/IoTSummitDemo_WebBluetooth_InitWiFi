var elem = document.getElementById('animations');
var two = new Two({ width: window.innerWidth, height: window.innerHeight}).appendTo(elem);

const colors = ["cyan", "hotpink", "white", "yellow", "yellowgreen", "#cd3245", "#88cd32"];
//https://pryaniky.blob.core.windows.net/tmp/distr/Updates/Demo_Tmp/electric-guitar.mp3
var drums = new Pz.Sound('/audio/drums.mp3');
var guitar = new Pz.Sound('/audio/guitar.mp3');
var bass = new Pz.Sound('/audio/bass-group.mp3');

var sawtoothWave1 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type: 'sine',
        frequency: 400
    }
});


var sawtoothWave2 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type: 'sine',
        frequency: 440
    }
});


var sawtoothWave3 = new Pizzicato.Sound({
    source: 'wave',
    options: {
        type: 'sine',
        frequency: 480
    }
});

//var delay = new Pizzicato.Effects.Delay();
//sawtoothWave.addEffect(delay);


var group = new Pizzicato.Group([drums, guitar]);

group.addSound(bass);
//group.addEffect(reverb);
//group.play();
var sound = group;
//sound.play();
document.addEventListener('keydown', e => {
    if(e.keyCode === 85){ //u
        drawCircle();
    } else if(e.keyCode === 81){ //q
        drawTriangle();
    } else if(e.keyCode === 87){ //w
        drawSquare();
    } else if(e.keyCode === 69){ //e
        drawLine();
    }
});

const draw = (f) => {
    sawtoothWave1.stop();
    sawtoothWave2.stop();
    sawtoothWave3.stop();
if(f === 1){ //u
    drawCircle();
    sawtoothWave1.play();

    } else if(f === 2){ //q
    drawTriangle();
    sawtoothWave2.play();
    } else if(f === 4){ //w
        drawSquare();
    } else if(f === 3){ //e
    drawLine();
    sawtoothWave3.play();

    }
/*	
	var highPassFilter = new Pizzicato.Effects.HighPassFilter({
    frequency: 10,
    peak: 10
    });

    sawtoothWave.play();


sound.addEffect(highPassFilter);
sound.play();*/
}

const drawCircle = () => {
    var circle = two.makeCircle(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2);

    if(getRandomInt() % 2 === 0){
        circle.noFill();
        circle.stroke = getRandomColor();
    } else {
        circle.fill = getRandomColor();
        circle.noStroke();
    }
    circle.linewidth = 30;
    circle.scale = 0;

    two.bind('update', function(frameCount) {
        if (circle.scale > 0.9) {
            two.remove(circle);
            two.pause();
        } else {
            var t = (1 - circle.scale) * 0.250;
            circle.scale += t;
            two.play();
        }
    }).play();
}

const drawTriangle = () => {
    var triangle = two.makePolygon(window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, 3);
    triangle.scale = 1;
    triangle.fill = "hotpink";
    triangle.stroke = "cyan";
    triangle.linewidth = 30;

    two.bind('update', function(frameCount) {
        if (triangle.scale < 0.01) {
            two.remove(triangle);
            two.pause();
        } else {
            var t = triangle.scale * 0.250;
            triangle.scale -= t;
            two.play();
        }
    }).play();
}

const getRandomColor = () => {
    let randomIndex = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[randomIndex];
}

const getRandomInt = () => Math.floor(Math.random() * Math.floor(11));

const drawLine = () => {
    let rectWidth = window.innerWidth;
    let rect;
    let even = (getRandomInt() % 2 === 0);

    rect = even ?
        two.makeRectangle(0-rectWidth, 0, rectWidth, 200):
        two.makeRectangle(window.innerWidth + rectWidth, 0, rectWidth, 200);

    rect.fill = getRandomColor();
    // rect.fill = 'rgba(0, 200, 255, 0.75)';
    rect.noStroke();
    rect.linewidth = 10;

    var group = two.makeGroup(rect);
    group.scale = 0.5;
    group.rotation = 0;

    let translation = even ? 0 : window.innerWidth + rectWidth;

    two.bind('update', function(frameCount) {
        if(even){
            if (translation > window.innerWidth + rectWidth) {
                stopAnimation();
            }
            var t = (1 - group.scale) * 0.3;                
            translation += t * 1000;
            group.translation.set(translation, two.height / 2)
            two.play();
        } else {
            if (translation < 0 - rectWidth) {
                stopAnimation();
            }
            var t = (1 - group.scale) * 0.3;                
            translation -= t * 1000;
            group.translation.set(translation, two.height / 2)
            two.play();
        }

        function stopAnimation() {
            translation = 0;
            group.scale = 0.5;
            two.remove(group);
            two.pause();
        }

    }).play();  
}

const drawSquare = () => {
    var rect = two.makeRectangle(0, 0, 200, 200);
    rect.fill = getRandomColor();
    // rect.fill = 'rgba(0, 200, 255, 0.75)';
    rect.stroke = "#ffffff";
    rect.linewidth = 10;

    var group = two.makeGroup(rect);
    group.translation.set(two.width / 2, two.height / 2);
    group.scale = 0.5;
    group.rotation = 0;

    two.bind('update', function(frameCount) {
        if (group.rotation > 0.95) {
            group.rotation = 0;
            group.scale = 0.5;
            two.remove(group);
            two.pause();
        } else {
            var t = (1 - group.rotation) * 0.01;
            group.scale += 0.05;
            group.rotation += t * 4 * Math.PI;
            two.play()
        }
    }).play();  
}
