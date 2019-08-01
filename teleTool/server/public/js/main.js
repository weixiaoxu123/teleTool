var IpCodec = require('ip-codec');
var ipcodec = new IpCodec();
var gui = require('nw.gui');
var win = gui.Window.get();
var os = require('os');
var child_process = require("child_process");
var fs = require("fs");
var IPv4 = null;
var CanSetStatus = true;


win.on('close', function () {
    console.log("We're closing...");
    ShutDown();
    this.close(true);
});
win.on('loaded', function () {
    console.log("We're loaded...");
  });


$(document).ready(function () {
    console.log(os.networkInterfaces());

    var raw = JSON.stringify(os.networkInterfaces());

    var possibleIp;

    if (raw.indexOf("192") == -1) {

        // 弹出警告窗口：您的IP地址不属于可用本插件的范围（Detect no IP starts with '192'）
        //return;
    }
    possibleIp = raw.substr(raw.indexOf("192"), 15).match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/);

    console.log(possibleIp);

    if (possibleIp.length > 0) {
        IPv4 = ipcodec.encode(possibleIp[0]); //对ip 加密处理
    }
    else {
        IPv4 = " ";        
    }

     GetIP();
    console.log(IPv4)
});


function SetStatus(value) {
    if (CanSetStatus) {
        document.getElementById("Statusbar").innerHTML = value;
    }
}

function ClearStatus() {
    SetStatus('');
}

function ChooseCharacter(c) {
    if (c == 0) {
        $('#Supporter').fadeOut();
        $('#ShopAssistant').fadeOut();
        $("#ButtonSupporterMode2").fadeOut();
        $("#ButtonShopAssistantMode2").fadeOut();

        $('#Ask').fadeIn();
        ShutDown();
        return;
    }
    if (c == 1) {
        $('#Ask').fadeOut();
        $('#ShopAssistant').fadeIn();
        $("#ButtonShopAssistantMode2").fadeIn();
        return;
    }
    if (c == 2) {
        $('#Ask').fadeOut();
        $("#ButtonSupporterMode2").fadeIn();
        $('#Supporter').fadeIn();
        return;
    }
}

function ShowSupporterMode2() {
    document.getElementById('SupporterMode2').style.display = "";  
}

function ShowShopAssistantMode2() {
    document.getElementById('ShopAssistantMode2').style.display = "";
}


function GetIP() {
    document.getElementById('Ipgetter').value = IPv4;
    document.getElementById('Shopassistantip').value = IPv4;
}

var viewerProcesss;
function StartVNCViewer() {
    console.log("exec StartVNCViewer");
    child_process.execFile("vncviewer.exe", ['-listen'], { cwd: 'vnc' }, function (error, stdout, stderr) {
        if (error != null) {
            console.log("exec error" + error);
        }
        else console.log("StartVNCViewer 成功");
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
}

function StopVNCViewer() {
    console.log("exec StopVNCViewer");

    child_process.execFile("viewer-stop.bat", null, { cwd: 'vnc' }, function (error, stdout, stderr) {
        if (error != null) {
            console.log("exec error::" + error);
        }
        else console.log("StopVNCViewer 成功");
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    console.log("exec StopVNCViewer end");
}


var serverProcesss1;
var serverProcesss2;
function StartVNCServer() {
    console.log("exec StartVNCServer");
    var HelperIP = document.getElementById("Helperip").value.trim();
    serverProcesss1 = child_process.execFile("server-start.bat", null, { cwd: 'vnc' });
    //child_process.execFile("server-connect.bat", null, { cwd: 'vnc' });

    console.log("exec StartVNCServer 2nd time connection" + "-connect " + ipcodec.decode(HelperIP));
    CreateConnectBatFile("winvnc4.exe -connect  " + ipcodec.decode(HelperIP));



    console.log("exec StartVNCServer end");
}

function StartVNCServer2() {
    console.log("exec StartVNCServer2");
    serverProcesss1 = child_process.execFile("server-start.bat", null, { cwd: 'vnc' });
    console.log("exec StartVNCServer2 end");
}

function StopVNCServer() {
    console.log("exec StopVNCServer");
    child_process.execFile("server-stop.bat", null, { cwd: 'vnc' }, function (error, stdout, stderr) {
        if (error !== null) {
            console.log("exec error" + error);
        }
        else console.log("StopVNCServer 成功");
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    console.log("exec StopVNCServer end");
}

function ShutDown() {
    StopVNCServer();
    StopVNCViewer();
}



function Helping() {
    var AssistantIP = ipcodec.decode(document.getElementById("Assistantip").value.trim());
    if (AssistantIP == "") {
        SetStatus("IP不能为空");
        return;
    }
    CreateConnect2BatFile("vncviewer.exe " + AssistantIP);
}

function CallForHelp() {
    var HelperIP = ipcodec.decode(document.getElementById("Helperip").value.trim());
    if (HelperIP == "") {
        SetStatus("IP不能为空");
        return;
    }
    StartVNCServer();
    SetStatus("请耐心等待......");
    CanSetStatus = false;
    setTimeout(() => {
        CanSetStatus = true;
        ClearStatus();
    }, 10000);

}

function KeyBoardGetHelp() {
    if (window.event.keyCode == 13) CallForHelp();
}



function CreateConnectBatFile(data = "winvnc4.exe -connect 127.0.0.1") {
    console.log("写入connect.bat");
    fs.writeFileSync('vnc/connect.bat', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
        if (err) {
            console.log("文件写入失败")
        } else {
            console.log("文件写入成功");
        }
    });
    setTimeout(function () {
        child_process.execFile("connect.bat", null, { cwd: 'vnc' }, function (error, stdout, stderr) {
            if (error != null) {
                console.log("打开connectbat error" + error);
            }
            else console.log("打开connectbat 成功");
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });
    }, 2000);
}

function CreateConnect2BatFile(data = "vncviewer.exe  127.0.0.1") {
    console.log("写入connect2.bat");
    fs.writeFileSync('vnc/connect2.bat', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
        if (err) {
            console.log("文件写入失败")
        } else {
            console.log("文件写入成功");
        }
    });
    setTimeout(function () {
        child_process.execFile("connect2.bat", null, { cwd: 'vnc' }, function (error, stdout, stderr) {
            if (error != null) {
                console.log("打开connect2bat error" + error);
            }
            else console.log("打开connect2bat 成功");
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        });
    }, 2000);
}


function FloatingOrb() {
    document.getElementById('FloatingOrb').style.display = '';
    win.setMinimumSize(300, 200);
    win.setMaximumSize(300, 200);
}


function _ReadConnectBat() {
    fs.readFile('vnc/connect.bat', function (err, data) {
        if (err) {
            console.log("bad");
            console.log(err.name + "   " + err.message + "  " + err.code);
        } else {
            console.log("ok");
            console.log(data);
            console.log(data.toString());
        }
    });
}
