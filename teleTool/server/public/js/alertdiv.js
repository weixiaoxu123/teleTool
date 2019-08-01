
var AlertAns;

InitAlertDiv = function () {
    $(document.body).append(`    
    <div id="__AlertDiv__" class="popwindow" style="width: 450px; height:240px; display:none;  background: rgb(229, 238, 245);">
        
        <div style="width: 300px;margin:auto;">
            <table>
                <tbody>
                    <tr style="height:110px">
                        <td><img id="__AlertType__" src="" style="width:80px"></td>
                        <td  id="__AlertMsg__" style="font-size:20px; width:300px; max-width:300px; word-break:break-all"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br/>

        <input type="button"  id="__AlertConfirm__" value="确认" onmouseup="AlertAnswer(1)"></input>
        <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</label>
        <input type="button"  id="__AlertCancel__" value="取消" onmouseup="AlertAnswer(0)"></input>
    </div>
    `);
}

AlertDiv = async function (msg, type) {
    var div = getAlertDiv();
    var imgsrc = "";

    switch (type) { 
        case "error":
            imgsrc = "img/error.png";
            break;

        case "warning":
            imgsrc = "img/warn.png";
            break;

        default: imgsrc = "";
    }

    document.getElementById("__AlertMsg__").innerHTML = msg;
    document.getElementById("__AlertType__").src = imgsrc;
    


    div.style.display = "";

    $(div).fadeIn();
    $(div).show();



}

AlertDivFade = function () {
    $(getAlertDiv()).fadeOut();
    $(getAlertDiv()).hide();
}

ClearAlertDiv = function () {
    var div = getAlertDiv();
    document.getElementById("__AlertMsg__").innerHTML = "";
    document.getElementById("__AlertType__").src = "";
}

AlertAnswer = function (ans) {

}

getAlertDiv = function () {
    return document.getElementById("__AlertDiv__");
}

$(document).ready(() => {    
    InitAlertDiv();
    AlertAns = null;
});
