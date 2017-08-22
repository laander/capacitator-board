<template>
  <div class="grid" :style="gridNumbers">
    <heading
      @refresh="loadData"
      :loading="loading"
      :error="error">
    </heading>
    <div v-for="environment in environments" class="environment">
      {{ environment }}
    </div>
    <template v-for="project in projects">
      <div class="project">
        <span>{{ project.project }}</span>
      </div>
      <template v-for="deployment in project.environments">
        <deployment
          :deployment="deployment">
        </deployment>
      </template>
    </template>
  </div>
</template>

<script>
import { config } from 'services/configLoader.js'
import { process } from 'services/dataMassage.js'
import { fetcher } from 'services/dataFetcher.js'
import deployment from 'components/deployment.vue'
import heading from 'components/heading.vue'

const projectConfig = config()

export default {
  name: 'app',
  components: {
    deployment,
    heading
  },
  computed: {
    gridNumbers () {
      return {
        '--colNum': this.environments.length + 1,
        '--rowNum': this.projects.length + 1
      }
    }
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
  font-family: 'Monaco', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  text-align: center;
}

.app-version {
  display: none;
}

.grid {
  --rowNum: 1;
  --colNum: 1;
  display: grid;
  grid-template-columns: repeat(var(--colNum), 1fr);
  grid-template-rows: repeat(var(--rowNum), auto);
  grid-gap: 10px;
  margin: 10px;
}

.environment {
  color: #a3d6ff;
  padding: 20px 10px;
}

.project {
  text-align: left;
  padding: 0 10px 0 20px;

  span {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
