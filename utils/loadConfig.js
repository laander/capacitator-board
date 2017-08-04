var path = require('path')
var lodash = require('lodash')
var fs = require('fs')

function loadDefaultConfig () {
  var defaultConfigPath = path.resolve('./config.default.js')
  return require(defaultConfigPath)
}

function loadCustomConfig () {
  var customConfigPath = path.resolve('./config.js')
  if (!fs.existsSync(customConfigPath)) return {}
  return require(customConfigPath)
}

function loadCustomEnvs () {
  var result = {}
  var apiEndpoint = process.env.CAP_API_ENDPOINT
  var projectsPref = process.env.CAP_PROJECTS_PREF
  var envsPref = process.env.CAP_ENVIRONMENTS_PREF
  if (apiEndpoint) result.apiEndpoint = apiEndpoint
  if (projectsPref) result.projectsOrderPreferences = projectsPref.replace(/ /g, '').split(',')
  if (envsPref) result.environmentsOrderPreferences = envsPref.replace(/ /g, '').split(',')
  return result
}

var defaultConfig = loadDefaultConfig()
var customConfig = loadCustomConfig()
var customEnvs = loadCustomEnvs()
var config = lodash.defaults(customEnvs, customConfig, defaultConfig)

module.exports = config
