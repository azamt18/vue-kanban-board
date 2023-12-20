<template>
  <CardCreateFormComponent />
</template>

<script>
import CardCreateFormComponent from '@/components/mail/create/CardCreateFormComponent'
import {LAYOUT_TITLE_CHANGED} from "@/store/modules/layout/actions";
import {TASK_CREATED} from "@/events/mail";

export default {
  name: "CardCreateFormPage",
  components: {
    CardCreateFormComponent
  },
  methods: {
    onMailCreated(mail) {
      this.$router.push({name: 'mail-view', params: {id: mail.id}})
    }
  },
  created() {
    this.$store.dispatch(LAYOUT_TITLE_CHANGED, 'Новое письмо из PDF файла')

    this.$bus.$on(TASK_CREATED, this.onMailCreated)
  },
  beforeDestroy() {
    this.$bus.$off(TASK_CREATED, this.onMailCreated)
  }
}
</script>

<style scoped>

</style>
