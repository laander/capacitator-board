import { reduce, map, merge, zipObject, union, keys } from 'lodash'

export function process (input, preferences) {
  const environments = extractEnvironments(input, preferences)
  const data = processProjects(input, environments, preferences)
  return { data, environments }
}

function processProjects (projects, envs, prefs) {
  // Sort and arrayify the envs for each project
  const sortedEnvs = reduce(projects, (result, value, key) => {
    merge(value, zipObject(envs, map(envs, () => {})))
    const arrayedEnvs = map(value, (value, key) => merge({ environment: key }, value))
    result[key] = sortByPreference(arrayedEnvs, prefs.environments, 'environment')
    return result
  }, {})
  // Arrayify each project
  const unsortedProjects = map(sortedEnvs, (environments, project) => merge({ project }, { environments }))
  // Sort each projects
  return sortByPreference(unsortedProjects, prefs.projects, 'project')
}

function sortByPreference (source, reference, key) {
  return source.sort((a, b) => {
    if (reference.indexOf(a[key] || a) === -1) return true
    if (reference.indexOf(b[key] || b) === -1) return false
    return reference.indexOf(a[key] || a) > reference.indexOf(b[key] || b)
  });
}

function extractEnvironments (projects, prefs) {
  const unsorted = reduce(projects, (result, value) => union(result, keys(value)), [])
  return sortByPreference(unsorted, prefs.environments)
}

//
// {
//   "admin": {
//     "prod": {
//       "version": "3.12.0",
//       "user": "laander",
//       "link": "https://admin.timekit.io",
//       "timestamp": "2017-08-03T07:43:49+00:00"
//     },
//     "staging": {
//       "version": "3.12.0",
//       "user": "laander",
//       "link": "https://admin-staging.timekit.io",
//       "timestamp": "2017-08-03T07:47:25+00:00"
//     }
//   },
//   "api": {
//     "staging": {
//       "version": "v2.85.9",
//       "timestamp": "2017-08-03T12:45:51+00:00"
//     },
//     "prod": {
//       "version": "v2.86.0",
//       "timestamp": "2017-08-02T08:43:25+00:00"
//     }
//   }
// }


// [{
//   "project": "api",
//   "environments": [{
//     "environment": "prod",
//     "version": "v2.86.0",
//     "timestamp": "2017-08-02T08:43:25+00:00"
//   }, {
//     "environment": "staging",
//     "version": "v2.85.9",
//     "timestamp": "2017-08-03T12:45:51+00:00"
//   }]
// }, {
//   "project": "admin",
//   "environments": [{
//     "environment": "prod",
//     "version": "3.12.0",
//     "user": "laander",
//     "link": "https://admin.timekit.io",
//     "timestamp": "2017-08-03T07:43:49+00:00"
//   }, {
//     "environment": "staging",
//     "version": "3.12.0",
//     "user": "laander",
//     "link": "https://admin-staging.timekit.io",
//     "timestamp": "2017-08-03T07:47:25+00:00"
//   }]
// }]
