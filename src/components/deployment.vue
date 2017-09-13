<template>
  <div v-if="deployment.version" class="deployment">
    <a v-if="deployment.link" :href="deployment.link" target="_blank" class="version">
      {{ deployment.version }}
    </a>
    <span v-else class="version">
      {{ deployment.version }}
    </span>
    <span v-if="deployment.user" class="user">
      @{{ deployment.user }}
    </span>
    <span v-else class="user">
      <i>unknown</i>
    </span>
    <span class="timestamp" :class="getTimeColorCode(deployment.timestamp)">
      <div v-if="shouldShowTimestampDot(deployment.timestamp)" class="timestamp-dot" title="Released within the last hour"></div>
      <span :title="deployment.timestamp">
        {{ getTimestamp(deployment.timestamp) }}
      </span>
    </span>
  </div>
  <div v-else class="deployment--na">
    <span>N/A</span>
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
    getTimestamp (time) {
      return moment(time).fromNow()
    },
    getTimeColorCode (time) {
      let timeDiffHours = Math.abs(moment(time).diff(moment(), 'hours'))
      let timeDiffDays = timeDiffHours / 24
      if (timeDiffHours <= 12) return 'green'
      if (timeDiffDays <= 3) return 'yellow'
      if (timeDiffDays <= 10) return 'orange'
      return 'red'
    },
    shouldShowTimestampDot (time) {
      let timeDiff = Math.abs(moment(time).diff(moment(), 'minutes'))
      return timeDiff < 60
    }
  }
}
</script>

<style lang="scss" scoped>
.deployment {
  background-color: #2c2d36;
  border-radius: 3px;
  padding: 20px 15px;
  vertical-align: middle;

  &:hover {
    background-color: #32333d;
  }
}

.deployment--na {
  font-size: 11px;
  color: rgba(#cccccc, 0.48);

  span {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}

.version {
  display: block;
  padding-bottom: 10px;
  font-size: 12px;
  color: rgba(#ffffff, 0.76);
  text-decoration: none;
}

a.version:hover {
  text-decoration: underline;
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
