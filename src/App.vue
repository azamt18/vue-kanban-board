<template>
  <div>
    <router-view v-if="waitingDone"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      waitingDone: false
    }
  },
  created() {
    setTimeout(() => {
      this.waitingDone = true;
    }, 500)
  }
};
</script>
