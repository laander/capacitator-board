<template>
  <div id="app">
    <table class="table" cellpadding="0" cellspacing="0">
      <tr>
        <th class="project header">
          <h1>$capacitator</h1>
          <div v-if="loading">
            <br />Loading...
          </div>
        </th>
        <th v-for="header in headers" class="header">
          {{ header }}
        </th>
      </tr>
      <tr v-for="pro in proProjects">
        <td class="project">
          <strong>{{pro.project}}</strong>
        </td>
        <td v-for="environment in pro.environments" :class="{ 'deploy-cell': environment.version }">
          <div v-if="environment.version" class="deploy-card">
            <span class="version">
              <a v-if="environment.link" :href="environment.link" target="_blank">
                {{ environment.version }}
              </a>
              <span v-else>
                {{ environment.version }}
              </span>
            </span>
            <span class="user">
              <template v-if="environment.user">
                @{{ environment.user }}
              </template>
              <template v-else>
                <i>unknown</i>
              </template>
            </span>
            <span class="timestamp" :class="getTimeColorCode(environment.timestamp)">
              <div v-if="shouldShowTimestampDot(environment.timestamp)" class="timestamp-dot" title="Released within the last hour"></div>
              <span :title="environment.timestamp">
                {{ getTimestamp(environment.timestamp) }}
              </span>
            </span>
          </div>
          <div v-else class="not-available">
            N/A
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { keys, union, reduce, sortBy, values, map, merge, zipObject } from 'lodash'
import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
      loading: true,
      rawProjects: {},
      proProjects: {}
    }
  },
  computed: {
    headers () {
      let unsorted = reduce(this.rawProjects, (result, value, key) => {
        return union(result, keys(value))
      }, [])
      return this.sortByPreference(unsorted, this.orderEnvironments)
    },
    orderProjects () {
      return [
        'api',
        'admin',
        'booking-js',
        'js-sdk',
        'my-hosted'
      ]
    },
    orderEnvironments () {
      return [
        'prod',
        'staging',
        'staging2',
        'staging3',
        'staging4',
        'staging5',
        'beta'
      ]
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let url = 'https://wt-3bd7299d97400fd5655b883c44d233ab-0.run.webtask.io/capacitator'
      let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      window.fetch(url, { headers })
      .then(response => {
        return response.json()
      }).then(myBlob => {
        this.rawProjects = myBlob
        this.proProjects = this.sortProjectEnvs(myBlob)
        this.loading = false
      })
    },
    sortProjectEnvs(projects) {
      let sortedEnvs = reduce(projects, (result, value, key) => {
        merge(value, zipObject(this.headers, map(this.headers, () => {})))
        let envs = map(value, (value, key) => merge({ environment: key }, value))
        result[key] = this.sortByPreference(envs, this.orderEnvironments, 'environment')
        return result
      }, {})
      let unsorted = map(sortedEnvs, (value, key) => {
        return merge({ project: key }, { environments: value })
      })
      return this.sortByPreference(unsorted, this.orderProjects, 'project')
    },
    getTimestamp(time) {
      return moment(time).fromNow()
    },
    getTimeColorCode(time) {
      let timeDiffHours = Math.abs(moment(time).diff(moment(), 'hours'));
      let timeDiffDays = timeDiffHours / 24
      if (timeDiffHours <= 12 ) return 'green'
      if (timeDiffDays <= 3 ) return 'yellow'
      if (timeDiffDays <= 10 ) return 'orange'
      return 'red'
    },
    shouldShowTimestampDot (time) {
      let timeDiff = Math.abs(moment(time).diff(moment(), 'minutes'));
      return timeDiff < 60
    },
    sortByPreference(source, reference, key) {
      return source.sort((a, b) => {
        if (reference.indexOf(a[key] || a) === -1) return true
        if (reference.indexOf(b[key] || b) === -1) return false
        return reference.indexOf(a[key] || a) > reference.indexOf(b[key] || b)
      });
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #212228;
  color: rgba(#ffffff, 0.76);
  padding: 0;
  margin: 0;
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

h1 {
  margin: 0;
  font-size: 13px;
  color: #ff9d00;
}

table {
  width: 100%;
  table-layout: fixed;

  td, th {

    &.header {
      color: #a3d6ff;
      padding: 25px 15px;
    }

    &.project {
      width: 130px;
      text-align: left;
      padding: 25px 15px 25px 30px;
    }

    .not-available {
      font-size: 11px;
      color: rgba(#cccccc, 0.48);
    }

    &.deploy-cell {
      vertical-align: top;
    }

    .deploy-card {
      background-color: #2c2d36;
      border-radius: 3px;
      padding: 20px 15px;
      margin: 7px;

      &:hover {
        background-color: #32333d;
      }
    }

    .version {
      display: block;
      padding-bottom: 10px;
      font-size: 12px;

      a {
        color: rgba(#ffffff, 0.76);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .user {
      display: block;
      font-size: 11px;
      color: rgba(#cccccc, 0.6);
    }

    .timestamp {
      font-size: 11px;
      display: block;

      .timestamp-dot {
        display: none;
        border-radius: 100px;
        width: 7px;
        height: 7px;
        animation: pulsate 2s ease-in-out infinite;
      }

      &.green {
        color: rgb(96, 255, 123);

        .timestamp-dot {
          display: inline-block;
          background-color: rgb(96, 255, 123);
        }
      }
      &.yellow { color: rgb(222, 255, 152); }
      &.orange { color: rgb(255, 194, 75); }
      &.red { color: rgb(255, 107, 107); }
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

@-webkit-keyframes pulsate {
    0% { opacity: 1; }
    50% { opacity: 0.2}
    100% { opacity: 1; }
 }

</style>
