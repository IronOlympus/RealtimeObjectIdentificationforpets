var status1 = "";
var objects = [];
video = "";
var lookfor = document.getElementById("input").value;
function setup(){
    canvas = createCanvas(200,200);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,200,200);
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "Objects Detected";
           document.getElementById("number_of_obj").innerHTML = "Number of Objects : " + objects.length;
           fill('#FF0000');
           var percent = floor(objects[i].confidence*100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke('#FF0000');
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           console.log(objects[i].label);
           var lookfor = document.getElementById("input").value;
           if(lookfor == objects[i].label){
            var synth = window.speechSynthesis;
            speak_data_1 = lookfor + " detected!";
            var utterThis = new SpeechSynthesisUtterance(speak_data_1);
            synth.speak(utterThis);
             window.alert(lookfor + " detected!");
             objectDetector.detect(gotResult);
             webcamLiveView.stop();
           }
        }
    }
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
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
