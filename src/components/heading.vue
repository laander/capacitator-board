<template>
  <h1>
    <a @click.prevent="refresh" :class="{ 'error': error }">
      <span>$capacitator</span>
      <loading :active="loading"></loading>
      <error :active="error"></error>
    </a>
  </h1>
</template>

<script>
import loading from 'components/loading.vue'
import error from 'components/error.vue'

export default {
  components: {
    loading,
    error
  },
  props: {
    loading: Boolean,
    error: Boolean
  },
  methods: {
    refresh () { this.$emit('refresh') }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  padding: 20px 10px 20px 20px;
  font-size: 13px;
  text-align: left;
  margin: 0;

  a {
    color: #ffb339;
    cursor: pointer;

    &.error {
      color: #ef5050;
    }
  }
}
</style>
