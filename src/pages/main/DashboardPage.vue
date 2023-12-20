<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title>
            <v-btn color="primary" text :to="{name: 'mail-create-pdf-form'}">Создать из PDF файла</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title>
            <v-btn color="primary" text :to="{name: 'mails-listing-draft'}">Открыть созданные письма</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title>
            <v-btn color="primary" text :to="{name: 'mails-listing-sent'}">Открыть отправленные письма
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title>
            <v-btn color="primary" text :to="{name: 'mails-listing-all'}">Открыть все письма</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {LAYOUT_TITLE_CHANGED} from "@/store/modules/layout/actions";

export default {
  name: "DashboardPage",
  computed: {},
  created() {
    this.$store.dispatch(LAYOUT_TITLE_CHANGED, 'Главное меню')
  }
}
</script>

<style scoped>

</style>
