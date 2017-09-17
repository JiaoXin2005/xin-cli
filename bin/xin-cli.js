#!/usr/bin/env node
var program = require('commander')
var shell = require('shelljs')
var fs = require('fs')
var path = require('path')
var { hostsFile } = require('./config')
var cmdPath = path.join(__dirname, '/command')

var cmdDirList = fs.readdirSync(cmdPath)

cmdDirList.map((dirName) => {
  var cmdIndex = require(path.join(cmdPath, '/', dirName))
  program.command(cmdIndex.cmd)
    .description(cmdIndex.description)
    .action(cmdIndex.action)
})

program
  .version('1.0.0')
  .option('-s, --show', '查看host文件')

program.parse(process.argv)


if (program.show) {
  var str = shell.cat(hostsFile)
  console.log(str.stdout)
}
