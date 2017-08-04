<template>
  <span v-if="active">
    {{ dot }}
  </span>
</template>

<script>
export default {
  props: {
    active: false
  },
  data () {
    return {
      interval: null,
      frame: 0,
      fps: 12
    }
  },
  computed: {
    dot () {
      return this.frames[this.frame]
    },
    frames () {
      return ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      this.interval = setInterval(() => {
        if (this.frame === this.frames.length - 1) this.frame = 0
        else this.frame++
      }, 1000 / this.fps)
    },
    stop () {
      clearInterval(this.interval)
    }
  }
}
</script>
