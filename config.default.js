module.exports = {

  // What endpoint to GET in order to retrieve data
  apiEndpoint: 'https://wt-3bd7299d97400fd5655b883c44d233ab-0.run.webtask.io/capacitator',

  // Define a preferred sorting order for the column/rows
  // If an entry is not in this list, it will have lowest priority
  projectsOrderPreferences: [
    'api',
    'admin',
    'booking-js',
    'js-sdk',
    'my-hosted'
  ],
  environmentsOrderPreferences: [
    'prod',
    'staging',
    'staging2',
    'staging3',
    'staging4',
    'staging5',
    'beta'
  ]
}
