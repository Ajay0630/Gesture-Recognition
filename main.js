//https://teachablemachine.withgoogle.com/models/fyXV1MKYX/model.json
camera = document.getElementById("camera");
Webcam.set({width:350, height:300, image_format : 'png', png_quality:90 });
Webcam.attach(camera);
console.log(ml5.version);
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='result_img' src='" + data_uri + "'>";
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/G8S4IVvII/model.json", modelReady);
var pre1 = "";
var pre2 = "";
function modelReady(){
    console.log("Model is loaded. Teachable Machine link: https://teachablemachine.withgoogle.com/models/G8S4IVvII/");
}
function speak(){
    speak_data_1 = "The first prediction is " + pre1;
    speak_data_2 = "The second prediction is " + pre2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    window.speechSynthesis.speak(utterThis);
}
function check(){
    img = document.getElementById("result_img");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        pre1 = results[0].label;
        pre2 = results[1].label;
        console.error(pre1);
        console.error(pre2);
    }
}