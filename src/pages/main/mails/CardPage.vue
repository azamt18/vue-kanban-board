<template>
  <v-card :loading="loading" class="elevation-12">
    <template v-if="mail">

      <v-card-actions>
        <template v-if="mail.isSent">
          <v-btn color="primary" text :to="{name: 'track', params: {uid: `EHM${mail.id}`}}">Протокол письма: {{ `EHM${mail.id}` }}</v-btn>
          <v-btn color="primary" @click="onShowReceiptClicked">Квитанция</v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" @click="onSendClicked">Отправить</v-btn>
        </template>
      </v-card-actions>
      <v-divider/>

      <v-card-title>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="mail.receiver"
                          label="Получатель"
                          :disabled="true"
            />
            <v-text-field v-model="mail.address"
                          label="Адрес"
                          :disabled="true"
            />
            <v-text-field v-model="mail.region.name"
                          label="Область"
                          :disabled="true"
            />
            <v-text-field v-model="mail.area.name"
                          label="Район"
                          :disabled="true"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="mailCreatedOnStr"
                          label="Дата создания"
                          :disabled="true"
            />
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <iframe type="application/pdf" width="100%" height="1000px" style="border: none">
          Пожалуйста обновите пожалуйста браузер
        </iframe>
      </v-card-text>

      <v-dialog v-model="sendDialog" :persistent="true" width="600px">
        <SignComponent :hash-code="sendHashCode" @cancel="onSendCancel" @sign="onSign" :disable="loading"/>
      </v-dialog>
    </template>

    <v-snackbar v-model="isSendFailed"
                :timeout="5000"
                :top="true"
                color="error"
    >
      Ошибка при отправке
    </v-snackbar>
  </v-card>
</template>

<script>
import {LAYOUT_LOADING_START, LAYOUT_LOADING_STOP} from "@/store/modules/layout/actions";
import CardService from '../../../services/card.service'
import Mapper from '../../../mappers'

export default {
  name: "CardPage",
  data() {
    return {
      loading: false,
      mail: null,
      mailCreatedOnStr: null,

      sendDialog: false,
      sendHashCode: '',
      isSendFailed: false,

      pdfPath: ''
    }
  },
  methods: {
    loadMail() {
      this.loading = true;
      this.$store.dispatch(LAYOUT_LOADING_START)

      const id = this.$route.params.id;
      CardService.getSingle(id)
          .then(response => {
            this.mail = Mapper.mapCard(response.data)

            this.mailCreatedOnStr = this.mail.createdOn.format('DD.MM.YYYY HH:mm:ss')
          }, () => {
            this.$router.go(-1)
          })
          .catch(() => {

          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch(LAYOUT_LOADING_STOP)
          })
    },
    onSendClicked() {
      this.loading = true;
      this.$store.dispatch(LAYOUT_LOADING_START)

      CardService.getSendHashCode(this.mail.id)
          .then(response => {
            this.sendHashCode = response.data
            this.sendDialog = true
          })
          .catch(() => {

          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch(LAYOUT_LOADING_STOP)
          })
    },
    onShowReceiptClicked() {
      this.loading = true;
      this.$store.dispatch(LAYOUT_LOADING_START)

      CardService.printPdf(this.mail.id)
          .then(() => { })
          .catch(() => { })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch(LAYOUT_LOADING_STOP)
          })
    },
    clearSend() {
      this.sendDialog = false
      this.sendHashCode = ''
    },
    onSendCancel() {
      this.clearSend()
    },
    onSign(signResult) {
      this.loading = true;
      this.$store.dispatch(LAYOUT_LOADING_START)
      this.isSendFailed = false

      CardService.send({id: this.mail.id, signature: signResult.pkcs7})
          .then(() => {
            this.clearSend()
            this.loadMail()
            BalanceService.get({organizationId: this.$store.getters.appLogin.organization.id})
                .then((data) => {
                  this.$store.commit('setBalance', data.data);
                })
          }, () => {
            this.isSendFailed = true
          })
          .catch(() => {

          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch(LAYOUT_LOADING_STOP)
          })
    }
  },
  created() {
    this.loadMail()
  },
  watch: {
    mail(val) {
      if (val) {
        CardService.getPdfPath(val.id)
        .then(response => {
          if (response.status === 200) {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const urlObject = window.URL.createObjectURL(blob);

            document.querySelector('iframe').setAttribute("src", urlObject)
          }
        })
      }
    },
    "$route": function () {
      this.loadMail()
    }
  }
}
</script>

<style scoped>

</style>
