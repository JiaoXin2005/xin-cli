var path = require('path')
var fs = require('fs')


// const hostsFile = path.resolve(__dirname, './../../hosts_demo')
const hostsFile = '/etc/hosts'

const tempHostsFile = path.resolve(__dirname, './../../tempHostsFile')
  
const config = {
  hostsFile,
  tempHostsFile
}

module.exports = config
