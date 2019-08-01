var PopAnswer;

function PopWindow(text = "你确定吗", buttontext1 = "确定", buttontext2 = "取消")
{
    document.getElementById('PopWindow').style.display= "";
    document.getElementById('PopWindowText').innerHTML = text;
    document.getElementById('popbutton1').value = buttontext1;
    document.getElementById('popbutton2').value= buttontext2;
}


function Confirm()
{
    ClosePopWindow();
    PopAnswer = true;
}

function Cancel()
{
    ClosePopWindow();
    PopAnswer = false;
}

function ClosePopWindow()
{
    document.getElementById('PopWindow').style.display= "none";
}