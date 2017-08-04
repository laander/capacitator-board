<template>
  <div id="app">
    <table class="table" cellpadding="0" cellspacing="0">
      <tr>
        <th class="project header">
          <h1>
            <a @click.prevent="loadData" :class="{ 'error': error }">
              <span>$capacitator</span>
              <loading :active="loading"></loading>
              <error :active="error"></error>
            </a>
          </h1>
        </th>
        <th v-for="header in environments" class="header" :class="{ 'empty': loading || error }">
          {{ header }}
        </th>
      </tr>
      <tr v-for="project in projects" class="row" :class="{ 'empty': loading || error }">
        <td class="project">
          <strong>
            {{ project.project }}
          </strong>
        </td>
        <td v-for="deployment in project.environments" :class="{ 'deploy-cell': deployment.version }">
          <deployment
            class="deployment"
            :deployment="deployment">
          </deployment>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { config } from 'services/configLoader.js'
import { process } from 'services/dataMassage.js'
import { fetcher } from 'services/dataFetcher.js'
import deployment from 'components/deployment.vue'
import loading from 'components/loading.vue'
import error from 'components/error.vue'

const projectConfig = config()

export default {
  name: 'app',
  components: {
    deployment,
    loading,
    error
  },
  data () {
    return {
      loading: false,
      error: false,
      projects: {},
      environments: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.error = false
      this.loading = true
      fetcher(projectConfig.apiEndpoint)
      .then(this.dataLoaded)
      .catch(this.dataFailed)
    },
    dataLoaded (response) {
      const preferences = {
        projects: projectConfig.projectsOrderPreferences,
        environments: projectConfig.environmentsOrderPreferences
      }
      const processed = process(response, preferences)
      this.environments = processed.environments
      this.projects = processed.data
      this.loading = false
    },
    dataFailed (response) {
      this.error = true
      this.loading = false
      console.error('Error loading data:', response)
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: #212228;
  color: rgba(#ffffff, 0.76);
}

#app {
  font-family: 'Monaco', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  text-align: center;
}

.app-version {
  display: none;
}

h1, h1 a {
  margin: 0;
  font-size: 13px;
  color: #ffb339;
  cursor: pointer;

  &.error {
    color: #ef5050;
  }
}

.table {
  width: 100%;
  table-layout: fixed;

  .header,
  .row {
    transition: opacity 0.1s ease;
    opacity: 1;

    &.empty {
      opacity: 0;
    }
  }

  td, th {

    &.header {
      color: #a3d6ff;
      padding: 25px 15px;
    }

    &.project {
      text-align: left;
      padding: 25px 15px 25px 30px;
    }

    &.deploy-cell {
      vertical-align: top;
    }

    .deployment {
      min-width: 100px;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #fff;
}
</style>
