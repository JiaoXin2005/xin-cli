var fs = require('fs')
var readline = require('readline')
var { hostsFile, tempHostsFile } = require('../../config/index.js')

var tempHosts = fs.createWriteStream(tempHostsFile)

module.exports = {
  cmd: 'close [hostName]',
  description: '关闭host映射 --open [正则]',
  action: function (hostNameExp, options) {
    var args = options.parent.rawArgs.slice(3)

    var rd = readline.createInterface({
      input: fs.createReadStream(hostsFile),
      output: tempHosts,
      terminal: false
    })

    var i = 1;
    rd.on('line', function(line) {
      if (i >9) {
        args.forEach(arg => {
          var reg = new RegExp('^' + arg, 'g'),
                addr = line.split(' ').pop()
          if (reg.test(addr) && line.indexOf('#') === -1) {
            line = `#${line}`          
          }
        })
      }
      tempHosts.write(line+'\n')      
      i++;
    })
    rd.on('close', function () {
      var rs = fs.createReadStream(tempHostsFile),
            ws = fs.createWriteStream(hostsFile)
      rs.pipe(ws)
      rs.pipe(process.stdout)
    })
  }
}