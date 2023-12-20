<template>
  <v-app id="inspire">
    <v-app-bar
        app
        clipped-right
        color="blue-grey"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Единая система отправки писем</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="primary_button" class="black--text">Выйти</v-btn>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list dense>
        <v-list-item :to="{name: 'dashboard'}">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>На главную</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item :to="{name: 'mail-create-pdf-form'}">
          <v-list-item-action>
            <v-icon>mdi-email-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Создать из PDF файла</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item :to="{name: 'mails-listing-draft'}">
          <v-list-item-action>
            <v-icon>mdi-email-open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Созданные</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'mails-listing-sent'}">
          <v-list-item-action>
            <v-icon>mdi-email-send</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Отправленные</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'mails-listing-all'}">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Все</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <v-container fluid>
        <router-view v-if="$store.getters.appIsInitialized"/>
      </v-container>
    </v-main>

    <v-overlay :value="$store.getters.layoutIsLoading || !$store.getters.appIsInitialized">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import {APP_INITIALIZE} from "@/store/modules/app/actions";
import {APP_INITIALIZE_FAILED} from "@/events/app";

export default {
  name: "MainLayout",
  data: () => ({
    drawer: null,
    left: false,
  }),
  methods: {
    onAppInitializationFailed() {
      this.$router.push({name: 'login'})
    },
  },
  computed: {
  },
  created() {
    console.log("Main layout created")
    this.$store.dispatch(APP_INITIALIZE)

    this.$bus.$on(APP_INITIALIZE_FAILED, this.onAppInitializationFailed)
  },
  beforeDestroy() {
    this.$bus.$off(APP_INITIALIZE_FAILED, this.onAppInitializationFailed)
  }
}
</script>

<style scoped>

</style>
