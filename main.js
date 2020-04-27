var changeValue = 50;
var maxValue = 250;
var minValue = 0;

var startTime= 0;
var endTime= 0;
var elapsedTime=0;
var repetition;

//タイマーが動いているか判断するフラグ
//trueで動いている状態
var timerFlag = false;

//タイマーをスタートさせる処理
function startTimer(){
    if(timerFlag == false){
        startTime = Date.now();
        timerFlag=true;
    }

}
//タイマーを止める処理
function stopTimer(){
    timerFlag=false;
    clearInterval(repetition);
}

//経過時間を画面時表示させる処理
function updateTime(){
    elapsedTime = Date.now() - startTime;
    var tempS =Math.floor(elapsedTime/1000);
    var m =Math.floor(tempS/60);
    var s =Math.floor(tempS-m*60);
    $('#timer').text(zeroPadding(m,2)+":"+zeroPadding(s,2));

    //時間制限処理呼び出し
    if($('#timer').text() == "30:00"){
        timeOver();
    }
}

//時間切れ処理
function timeOver(){
    $("#message").html('時間切れ！<br class="d-block d-sm-none">もう一度挑戦しよう！');
    $('#restart-button-message').empty()
    $('#restart-button-message').text('もう一度遊ぶ');
    stopTimer();
    buttonSwitchDisplay("none");
}

//ゼロ埋め処理
//lengthの長さになるまで、num(数値)をゼロ埋めする。
function zeroPadding(num,length){
    strNum = String(num);
    while(strNum.length < length){
        strNum = "0" + strNum;
    };
    return strNum;
}

//経過時間表示繰り返し処理
repetition = setInterval(function(){
    if(timerFlag==true){
        updateTime();  
    }
},1000);

//ボタン非表示処理
//引数に応じて以下の処理をする
//block　 :表示
//none 　 :非表示
//それ以外：なにもしない
function buttonSwitchDisplay(strArg){
    if(strArg=="block"){
        $("#buttons").css('display','block');
    }else if(strArg=="none"){
        $("#buttons").css('display','none');
    }else{
        return;
    }

}

//50刻みの場合で250を最大としたとき250/50で５段階ある
//０～５で数値出して、それに５０かける
function random(){
    return (Math.floor(Math.random() * (maxValue / changeValue + 1 - 0)) + 0)*50;
}

function randomColor(){

    var randomColorTxt ="";
    while(randomColorTxt=="" || randomColorTxt =="rgb(150, 150, 150)"){
        randomColorTxt = "rgb(" + String(random()) + ", " + String(random()) + ", " + String(random()) + ")";
    }

    console.log(randomColorTxt);
    return randomColorTxt;
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
        intValue = intValue + changeValue;
    }else if(upOrDown == "down"){
        intValue = intValue - changeValue;
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
        $('#restart-button-message').empty()
        $('#restart-button-message').text('もう一度遊ぶ');
        stopTimer();
    }
}

$(function(){
    　　$("#question").css('background-color',randomColor);
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
        //
        $('#up-red,#down-red,#up-green,#down-green,#up-blue,#down-blue').click(function(){
            if(timerFlag == false){
                startTimer();
            }
        });
});

$('#restart-button').click(function() {
    $('#message').empty();
    $('#question').css('background-color',randomColor);
    $('#restart-button-message').empty()
    $('#restart-button-message').text('はじめから');
    $('#answer').css('background-color','rgb(150, 150, 150)');
})

