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
  })
}

function extractEnvironments (projects, prefs) {
  const unsorted = reduce(projects, (result, value) => union(result, keys(value)), [])
  return sortByPreference(unsorted, prefs.environments)
}
