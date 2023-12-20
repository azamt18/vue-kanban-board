<template>
  <v-card :loading="loading" class="elevation-12">
    <v-card-title>New card</v-card-title>
    <v-card-text>
      <v-text-field v-model="title"
                    label="Title"
                    :error-messages="titleErrors"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click="onCreateClicked">Add a card</v-btn>
    </v-card-actions>

    <v-snackbar v-model="isCreateFailed"
                :timeout="5000"
                :top="true"
                color="error"
    >
      Error on creating a card
    </v-snackbar>
  </v-card>
</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'
import CardService from '@/services/card.service'
import Mapper from '../../../mappers'
import {LAYOUT_LOADING_START, LAYOUT_LOADING_STOP} from "@/store/modules/layout/actions";
import {TASK_CREATED} from "@/events/mail";

export default {
  name: "CardCreateFormComponent",
  data() {
    return {
      title: '',
      status: null,

      loading: false,
      isCreateFailed: false,
    }
  },
  validations: {
    title: {
      required,
      maxLength: maxLength(100)
    }
  },
  computed: {
    titleErrors() {
      const errors = []

      if (this.$v.title.$dirty) {
        if (!this.$v.title.required) {
          errors.push('Empty card title')
        } else {
          !this.$v.title.maxLength && errors.push('Max length is 100 chars')
        }
      }

      return errors
    },
  },
  methods: {
    onCreateClicked() {
      this.$v.$touch()

      if (!this.$v.$invalid) {

        this.isCreateFailed = false
        this.loading = true;
        this.$store.dispatch(LAYOUT_LOADING_START)

        CardService.create({
          title: this.title,
          status: this.status
        })
            .then(response => {
              let mail = Mapper.mapCard(response.data)
              this.$bus.$emit(TASK_CREATED, mail)
            }, () => {
              this.isCreateFailed = true
            })
            .catch(() => {

            })
            .finally(() => {
              this.loading = false;
              this.$store.dispatch(LAYOUT_LOADING_STOP)
            })
      }
    },
  }
}
</script>

<style scoped>

</style>
