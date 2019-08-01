// var gui = require('nw.gui');
// var win = gui.Window.get();
var IpCodec = require('ip-codec');
var ipcodec = new IpCodec();
var bodyParser= require('body-parser')
var os = require('os');
var child_process = require("child_process");
var fs = require("fs");
const Express = require('express');
var os = require('os')
var netList = os.networkInterfaces()

const TestMode = function () {
    return (process.env.NODE_ENV.indexOf('test') != -1);
}
const LogHead = "Server :: ";
var app = new Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/clientinfo', Express.static(process.cwd()));

function StartVNCViewer() {
    console.log("exec StartVNCViewer");
    child_process.execFile("vncviewer.exe", ['-listen'], { cwd: 'vnc' }, function (error, stdout, stderr) {
        if (error != null) {
            console.log("exec error" + error);
        }
        else {
        console.log("StartVNCViewer 成功");
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        }
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
function StartVNCServer(HelperIP) {
    console.log("exec StartVNCServer");
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

//  
function Helping(HelperIP) {
    var AssistantIP = ipcodec.decode(HelperIP);
    CreateConnect2BatFile("vncviewer.exe " + AssistantIP);
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




app.route('/').get((req,res)=>{
    return res.send('1');
})

app.route('/test').get((req,res)=>{
    console.log('收到前端的消息')
    return res.send('123456')
})


app.route('/getIp').get((req,res)=>{
    console.log('recive ---  getip')
    return res.send(netList['WLAN'][1].address)
})

app.route('/callForHelp').post((req,res)=>{
    console.log('callForHelp---startServer' +'===========' + req.body.ip)
    var HelperIP = req.body.ip
    HelperIP = ipcodec.decode(HelperIP.trim());
    // 在此进行 执行程序。
    StartVNCServer(HelperIP);
    return res.send('callForHelp success!')
})

app.route('/stopLinkServer').post((req,res)=>{
    console.log('stopLinkServer' +'===========')
    StopVNCServer()
    return res.send('stopLinkServer success!')
})

app.route('/linkBeiyong').post((req,res)=>{
    console.log('linkBeiyong' +'====')
    return res.send('linkbeiyong success!')
})

app.route('/stopBeiyong').post((req,res)=>{
    console.log('stopBeiyong' +'====')
    return res.send('stopBeiyong success!')
})

app.route('/linkView').post((req,res)=>{
    console.log('linkView=====')
    StartVNCViewer()
    return res.send('success!')
})

app.route('/stopView').post((req,res)=>{
    console.log('stopView=====')
    StopVNCViewer()
    return res.send('success!')
})

app.route('/linkViewBeiyong').post((req,res)=>{
    console.log('linkViewBeiyong')
    var HelperIP = req.body.ip
    HelperIP = HelperIP.trim();
    Helping(HelperIP);
    return res.send('success!')
})

app.route('/stopViewBeiyong').post((req,res)=>{
    console.log('stopViewBeiyong')
    // var HelperIP = req.body.ip
    // HelperIP = HelperIP.trim();
    StopVNCViewer()
    return res.send('success!')
})

app.listen(3000, () => {
    console.log(LogHead + 'Listening on port, process.cwd():' + process.cwd());
});

