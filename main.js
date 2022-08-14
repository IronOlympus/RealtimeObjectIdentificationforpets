function setup(){
    canvas = createCanvas(200,200);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,200,200);
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
