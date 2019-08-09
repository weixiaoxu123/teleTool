var os = require('os')
var IpCodec = require('ip-codec')
var ipcodec = new IpCodec()
var childprocess = require('child_process')
var fs = require('fs')
// var path = require('path')

// 修改ip获得方式
export function getIp () {
  var netList = os.networkInterfaces()
  var listKeys = Object.keys(netList)
  for (let i = 0; i < listKeys.length; i++) {
    for (let j = 0; j < netList[listKeys[i]].length; j++) {
      if ((netList[listKeys[i]][j]['address'].indexOf('132')) !== -1) {
        let ip = netList[listKeys[i]][j]['address']
        let ipv4 = ipcodec.encode(ip)
        return ipv4
      }
    // if ((netList[listKeys[i]][1]['address'].indexOf('192')) !== -1) {
    //   let ip = netList[listKeys[i]][1]['address']
    //   let ipv4 = ipcodec.encode(ip)
    //   return ipv4
    // if ((netList[listKeys[i]][1]['address'].indexOf('192')) !== -1) {
    //   let ip = netList[listKeys[i]][1]['address']
    //   let ipv4 = ipcodec.encode(ip)
    //   return ipv4
    }
  }
  let ipv4 = 'noIp'
  return ipv4
}
export function StartVNCViewer () {
  console.log('exec StartVNCViewer')
  childprocess.execFile('vncviewer.exe', ['-listen'], { cwd: 'vnc' }, function (error, stdout, stderr) {
    if (error != null) {
      console.log('exec error' + error)
    } else {
      console.log('StartVNCViewer 成功')
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
    }
  })
}

export function StopVNCViewer () {
  console.log('exec StopVNCViewer')

  childprocess.execFile('viewer-stop.bat', null, { cwd: 'vnc' }, function (error, stdout, stderr) {
    if (error != null) {
      console.log('exec error::' + error)
    } else {
      console.log('StopVNCViewer 成功')
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
    }
  })
  console.log('exec StopVNCViewer end')
}

export function StartVNCServer (HelperIP) {
  console.log('exec StartVNCServer')
  childprocess.execFile('server-start.bat', null, { cwd: 'vnc' })
  // serverProcesss1 = childprocess.execFile('server-start.bat', null, { cwd: 'vnc' });
  // childprocess.execFile('server-connect.bat', null, { cwd: 'vnc' });
  console.log('exec StartVNCServer 2nd time connection' + '-connect ' + ipcodec.decode(HelperIP))
  CreateConnectBatFile('winvnc4.exe -connect  ' + ipcodec.decode(HelperIP))
  console.log('exec StartVNCServer end')
}

export function StartVNCServer2 () {
  console.log('exec StartVNCServer2')
  childprocess.execFile('server-start.bat', null, { cwd: 'vnc' })
  // serverProcesss1 = childprocess.execFile('server-start.bat', null, { cwd: 'vnc' });
  console.log('exec StartVNCServer2 end')
}

export function StopVNCServer () {
  console.log('exec StopVNCServer')
  childprocess.execFile('server-stop.bat', null, { cwd: 'vnc' }, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error' + error)
    } else {
      console.log('StopVNCServer 成功')
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
    }
  })
  console.log('exec StopVNCServer end')
}

export function ShutDown () {
  StopVNCServer()
  StopVNCViewer()
}

export function Helping (HelperIP) {
  var AssistantIP = ipcodec.decode(HelperIP)
  CreateConnect2BatFile('vncviewer.exe ' + AssistantIP)
}

export function CreateConnectBatFile (data = 'winvnc4.exe -connect 127.0.0.1') {
  console.log('写入connect.bat')
  fs.writeFileSync('vnc/connect.bat', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
    if (err) {
      console.log('文件写入失败')
    } else {
      console.log('文件写入成功')
    }
  })
  setTimeout(function () {
    childprocess.execFile('connect.bat', null, { cwd: 'vnc' }, function (error, stdout, stderr) {
      if (error != null) {
        console.log('打开connectbat error' + error)
      } else {
        console.log('打开connectbat 成功')
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
      }
    })
  }, 2000)
}

export function CreateConnect2BatFile (data = 'vncviewer.exe  127.0.0.1') {
  console.log('写入connect2.bat')
  fs.writeFileSync('vnc/connect2.bat', data, { flag: 'w', encoding: 'utf-8', mode: '0666' }, function (err) {
    if (err) {
      console.log('文件写入失败')
    } else {
      console.log('文件写入成功')
    }
  })
  setTimeout(function () {
    childprocess.execFile('connect2.bat', null, { cwd: 'vnc' }, function (error, stdout, stderr) {
      if (error != null) {
        console.log('打开connect2bat error' + error)
      } else {
        console.log('打开connect2bat 成功')
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
      }
    })
  }, 2000)
}

export function _ReadConnectBat () {
  fs.readFile('vnc/connect.bat', function (err, data) {
    if (err) {
      console.log('bad')
      console.log(err.name + '   ' + err.message + '   ' + err.code)
    } else {
      console.log('ok')
      console.log(data)
      console.log(data.toString())
    }
  })
}
