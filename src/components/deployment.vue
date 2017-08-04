<template>
  <div v-if="deployment.version" class="card">
    <span class="version">
      <a v-if="deployment.link" :href="deployment.link" target="_blank">
        {{ deployment.version }}
      </a>
      <span v-else>
        {{ deployment.version }}
      </span>
    </span>
    <span class="user">
      <template v-if="deployment.user">
        @{{ deployment.user }}
      </template>
      <template v-else>
        <i>unknown</i>
      </template>
    </span>
    <span class="timestamp" :class="getTimeColorCode(deployment.timestamp)">
      <div v-if="shouldShowTimestampDot(deployment.timestamp)" class="timestamp-dot" title="Released within the last hour"></div>
      <span :title="deployment.timestamp">
        {{ getTimestamp(deployment.timestamp) }}
      </span>
    </span>
  </div>
  <div v-else class="card--not-available">
    N/A
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    deployment: {
      type: Object,
      required: true,
      default: {}
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  background-color: #2c2d36;
  border-radius: 3px;
  padding: 20px 15px;
  margin: 7px;

  &:hover {
    background-color: #32333d;
  }
}

.card--not-available {
  font-size: 11px;
  color: rgba(#cccccc, 0.48);
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

@-webkit-keyframes pulsate {
    0% { opacity: 1; }
    50% { opacity: 0.2}
    100% { opacity: 1; }
 }
</style>
