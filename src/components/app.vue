<template>
  <div id="app">
    <table class="table" cellpadding="0" cellspacing="0">
      <tr>
        <th class="project header">
          <h1>
            <a @click.prevent="initData" :class="{ 'error': error }">
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
import { process } from 'services/dataMassage'
import { fetcher } from 'services/dataFetcher'
import deployment from 'components/deployment.vue'
import loading from 'components/loading.vue'
import error from 'components/error.vue'

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
  computed: {
    orderPreferences () {
      return {
        projects: [
          'api',
          'admin',
          'booking-js',
          'js-sdk',
          'my-hosted'
        ],
        environments: [
          'prod',
          'staging',
          'staging2',
          'staging3',
          'staging4',
          'staging5',
          'beta'
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.error = false
      this.loading = true
      fetcher()
      .then(result => {
        const processed = process(result, this.orderPreferences)
        this.environments = processed.environments
        this.projects = processed.data
        this.loading = false
      })
      .catch(result => {
        console.log(result)
        this.error = true
        this.loading = false
      })
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
