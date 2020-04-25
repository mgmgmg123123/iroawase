var cangeValue = 50;
var maxValue = 250;
var minValue = 0;

//50刻みの場合で250を最大としたとき250/50で５段階ある
//０～５で数値出して、それに５０かける

function randam(){
    return (Math.floor(Math.random() * (maxValue / cangeValue + 1 - 0)) + 0)*50;
}

function randamColor(){

    var randamColorTxt ="";
    while(randamColorTxt=="" || randamColorTxt =="rgb(150, 150, 150)"){
        randamColorTxt = "rgb(" + String(randam()) + ", " + String(randam()) + ", " + String(randam()) + ")";
    }

    console.log(randamColorTxt);
    return randamColorTxt;
}

function changeRgbValue(upOrDown,color){
    var rgb = $('#answer').css('background-color');
    var array = rgb.match(/^\D+(\d+)\D+(\d+)\D+(\d+)\D+$/);
    console.log(upOrDown+": "+color)
    console.log("before"+array[1]+","+array[2]+","+array[3]);

    var checkIndex;
    if(color=="red"){
        checkIndex = 1;
    }else if(color=="green"){
        checkIndex = 2;
    }else if(color=="blue"){
        checkIndex = 3;
    }

    var intValue = Number(array[checkIndex]);

    if(upOrDown == "up"){
        intValue = intValue + cangeValue;
    }else if(upOrDown == "down"){
        intValue = intValue - cangeValue;
    }

    if(intValue > maxValue){
        array[checkIndex] = String(maxValue);
    }else if(minValue > intValue){
        array[checkIndex] = String(minValue);
    }else{
        array[checkIndex] = String(intValue);
    }

    console.log("after"+array[1]+","+array[2],array[3]);

    var nextColor="rgb("+array[1]+","+array[2]+","+array[3]+")";
    $("#answer").css('background-color',nextColor);

}

function compareColor(){
    var aColor = $('#answer').css('background-color');
    var qColor = $('#question').css('background-color');
    if(aColor==qColor){
        $("#message").html('色合わせ成功！<br class="d-block d-sm-none">おめでとう！');
    }
}

$(function(){
    　　$("#question").css('background-color',randamColor);
        $('#up-red').click(function() {
            changeRgbValue("up","red");
            compareColor();
        })
        $('#down-red').click(function() {
            changeRgbValue("down","red");
            compareColor();
        })
        $('#up-green').click(function() {
            changeRgbValue("up","green");
            compareColor();
        })
        $('#down-green').click(function() {
            changeRgbValue("down","green");
            compareColor();
        })
        $('#up-blue').click(function() {
            changeRgbValue("up","blue");
            compareColor();
        })
        $('#down-blue').click(function() {
            changeRgbValue("down","blue");
            compareColor();
        })
        
});