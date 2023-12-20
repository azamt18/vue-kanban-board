<template>
  <div>
<!--    <v-data-table-->
<!--        :headers="headers"-->
<!--        :items="items"-->
<!--        :server-items-length="total"-->
<!--        :options.sync="options"-->
<!--        :loading="loading"-->
<!--        :footer-props="{ itemsPerPageOptions: [10, 20, 50, 100, 200] }"-->
<!--        v-model="selectedItems"-->
<!--        class="elevation-12"-->
<!--        dense-->
<!--    >-->
<!--      <template v-slot:top>-->
<!--        <div class="px-4">-->
<!--          <v-row>-->
<!--            <v-col cols="12" sm="6" md="3" lg="3">-->
<!--              <v-menu-->
<!--                  v-model="filterStartMenu"-->
<!--                  transition="scale-transition"-->
<!--                  offset-y-->
<!--                  :nudge-right="40"-->
<!--                  max-width="290px"-->
<!--                  min-width="290px"-->
<!--              >-->
<!--                <template v-slot:activator="{on}">-->
<!--                  <v-text-field-->
<!--                      label="Начало даты создания"-->
<!--                      v-model="filterStartDisplayValue"-->
<!--                      readonly-->
<!--                      v-on="on"-->
<!--                      :clearable="true"-->
<!--                      @input="onChangeFilterStartDisplayValue"-->
<!--                  />-->
<!--                </template>-->
<!--                <v-date-picker-->
<!--                    v-model="filters.start"-->
<!--                    @change="onFilterStartChanged"-->
<!--                    no-title-->
<!--                    scrollable-->
<!--                    locale="ru"-->
<!--                    first-day-of-week="1"-->
<!--                />-->
<!--              </v-menu>-->
<!--            </v-col>-->
<!--            <v-col cols="12" sm="6" md="3" lg="3">-->
<!--              <v-menu-->
<!--                  v-model="filterEndMenu"-->
<!--                  transition="scale-transition"-->
<!--                  offset-y-->
<!--                  :nudge-right="40"-->
<!--                  max-width="290px"-->
<!--                  min-width="290px"-->
<!--              >-->
<!--                <template v-slot:activator="{on}">-->
<!--                  <v-text-field-->
<!--                      label="Начало даты создания"-->
<!--                      v-model="filterEndDisplayValue"-->
<!--                      readonly-->
<!--                      v-on="on"-->
<!--                      :clearable="true"-->
<!--                      @input="onChangeFilterEndDisplayValue"-->
<!--                  />-->
<!--                </template>-->
<!--                <v-date-picker-->
<!--                    v-model="filters.end"-->
<!--                    @change="onFilterEndChanged"-->
<!--                    no-title-->
<!--                    scrollable-->
<!--                    locale="ru"-->
<!--                    first-day-of-week="1"-->
<!--                />-->
<!--              </v-menu>-->
<!--            </v-col>-->
<!--            <v-col cols="12" sm="6" md="3" lg="3">-->
<!--              <v-select v-model="filters.statusType"-->
<!--                        :items="statusTypeFilterOptions"-->
<!--                        :clearable="true"-->
<!--                        label="Статус"-->
<!--                        @change="onStatusFilterChanged"-->
<!--              >-->
<!--              </v-select>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-col cols="12" sm="12" md="12" lg="12" class="text-right">-->
<!--              <v-btn x-large color="primary" dark @click="onRefreshButtonClicked">Обновить</v-btn>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-row>-->
<!--            <v-col v-if="allowMassDelete" cols="6" sm="12" md="6" lg="6" class="text-right">-->
<!--              <v-btn color="primary" :disabled="disableDeleteButton" @click="onDeleteClicked">Удалить</v-btn>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--          <v-dialog v-model="deleteCardDialog" :persistent="true" max-width="600px">-->
<!--            <v-card>-->
<!--              <v-card-title class="headline justify-center">Вы уверены, что хотите удалить?</v-card-title>-->
<!--              <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn color="blue darken-1" text @click="closeDeleteCardDialog">Отменить</v-btn>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn color="red darken-1"  text @click="deleteItemConfirm">Удалить</v-btn>-->
<!--                <v-spacer></v-spacer>-->
<!--              </v-card-actions>-->
<!--            </v-card>-->
<!--          </v-dialog>-->
<!--        </div>-->
<!--      </template>-->

<!--      <template v-slot:[`item.title`]="scope">-->
<!--        <router-link :to="{name: 'card-view', params: {id: scope.item.id}}">{{ scope.item.title }}</router-link>-->
<!--      </template>-->
<!--      <template v-slot:[`item.description`]="scope">-->
<!--        {{ scope.item.description }}-->
<!--      </template>-->
<!--      <template v-slot:[`item.createdOn`]="scope">-->
<!--        {{ scope.item.createdOn.format('DD.MM.YYYY HH:mm:ss') }}-->
<!--      </template>-->
<!--      <template v-slot:[`item.updatedOn`]="scope">-->
<!--        {{ scope.item.updatedOn.format('DD.MM.YYYY HH:mm:ss') }}-->
<!--      </template>-->
<!--      <template v-slot:[`item.activeStatus`]="scope">-->
<!--        <template v-if="scope.item.activeStatus">-->
<!--          {{ scope.item.activeStatus }}-->
<!--        </template>-->
<!--      </template>-->
<!--      <template v-slot:[`item.statusPerformedOn`]="scope">-->
<!--        <template v-if="scope.item.statusPerformedOn">-->
<!--          {{ scope.item.statusPerformedOn.format('DD.MM.YYYY HH:mm:ss') }}-->
<!--        </template>-->
<!--      </template>-->
<!--      <template v-slot:no-data>-->
<!--        Писем не найдено-->
<!--      </template>-->
<!--    </v-data-table>-->

<!--    <template>-->
<!--      <template v-if="isDeleteCardSuccess">-->
<!--        <v-snackbar v-model="isDeleteCardSuccess"-->
<!--                    :timeout="5000"-->
<!--                    color="success"-->
<!--        >-->
<!--          <v-layout align-center pr-4>-->
<!--            <v-layout column>-->
<!--              <div>-->
<!--                <strong>Письмо успешно удалено</strong>-->
<!--              </div>-->
<!--            </v-layout>-->
<!--          </v-layout>-->
<!--        </v-snackbar>-->
<!--      </template>-->
<!--      <template v-else>-->
<!--        <v-snackbar v-model="!isDeleteCardSuccess"-->
<!--                    :timeout="5000"-->
<!--                    color="error"-->
<!--        >-->
<!--          <v-layout align-center pr-4>-->
<!--            <v-layout column>-->
<!--              <div>-->
<!--                <strong>Ошибка при удалении пиcьма</strong>-->
<!--              </div>-->
<!--            </v-layout>-->
<!--          </v-layout>-->
<!--        </v-snackbar>-->
<!--      </template>-->
<!--    </template>-->

<!--    <v-progress-linear-->
<!--        v-if="massSendingInProgress"-->
<!--        :indeterminate="true"-->
<!--        :bottom="true"-->
<!--        v-model="massSignItems.completedItemsCount"-->
<!--        color="blue"-->
<!--        height="50"-->
<!--        striped-->
<!--    >-->
<!--      <template v-slot:default="{ value }">-->
<!--        <strong>{{ value }} </strong>-->
<!--      </template>-->
<!--    </v-progress-linear>-->

<!--    <v-snackbar v-if="showSnackbar"-->
<!--                v-model="massSendCompleted"-->
<!--                :timeout="20000"-->
<!--                :bottom="true"-->
<!--                color="info"-->
<!--    >-->
<!--      <div class="d-flex justify-space-around">-->
<!--        <div class="font-weight-bold">Успешно: {{ this.massSignItems.successSignedItems }}</div>-->
<!--        <div class="font-weight-bold"> |</div>-->
<!--        <div class="font-weight-bold">Неудачно: {{ this.massSignItems.failedSignedItems }}</div>-->
<!--        <div>-->
<!--          <v-btn class="ml-auto" icon small right @click="onCloseSnackbarClicked">-->
<!--            <v-icon>mdi-close</v-icon>-->
<!--          </v-btn>-->
<!--        </div>-->
<!--      </div>-->
<!--    </v-snackbar>-->
  </div>
</template>

<script>
import _ from 'underscore'
import Moment from 'moment'
import * as StatusTypes from '../../enums/status.type'
import CardService from "@/services/card.service";
import formatter from "../../plugins/formatter";

export default {
  name: "CardsDataTable",
  props: {
    mails: {
      type: Array,
      default: () => {
        return [];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    allowMassDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showSnackbar: false,

      options: {
        sortBy: ['createdOn'],
        sortDesc: [true],
        page: 1,
        itemsPerPage: 50,
      },
      filters: {
        start: null,
        end: null,
        statusType: null,
      },
      filterStartMenu: false,
      filterEndMenu: false,
      filterStartDisplayValue: '',
      filterEndDisplayValue: '',

      currentItem: null,
      deleteCardDialog: false,
      isDeleteCardSuccess: false,

      selectedItems: [],
      massSendingInProgress: false,
      massSendCompleted: false,

      massSignItems: {
        completedItemsCount: 0,
        successSignedItems: 0,
        failedSignedItems: 0,
      },
    };
  },
  computed: {
    disableDeleteButton() {
      return this.selectedItems.length <= 0;
    },
    statusTypeFilterOptions() {
      const options = []
      _.each(StatusTypes, statusType => {
        options.push({
          text: statusType.name,
          value: statusType
        })
      })

      return options
    },
    items() {
      let number = 1;
      let skip = this.skip;
      return _.map(this.mails, m => {
        m.displayNumber = skip + (number++)
        return m
      })
    },
    headers() {
      const headers = [];

      headers.push({
        text: '№',
        align: 'center',
        sortable: false,
        value: 'displayNumber'
      })

      headers.push({
        text: 'Идентификатор',
        align: 'center',
        sortable: false,
        value: 'id'
      })

      headers.push({
        text: 'title',
        align: 'left',
        sortable: false,
        value: 'title'
      })

      headers.push({
        text: 'description',
        align: 'left',
        sortable: false,
        value: 'description'
      })

      headers.push({
        text: 'createdOn',
        align: 'center',
        sortable: true,
        value: 'createdOn'
      })

      headers.push({
        text: 'updatedOn',
        align: 'center',
        sortable: true,
        value: 'updatedOn'
      })

      headers.push({
        text: 'activeStatus',
        align: 'center',
        sortable: false,
        value: 'activeStatus'
      })

      headers.push({
        text: 'statusPerformedOn',
        align: 'center',
        sortable: false,
        value: 'statusPerformedOn'
      })

      return headers;
    },
    skip() {
      return (this.options.page - 1) * this.options.itemsPerPage
    },
  },
  methods: {
    onCloseSnackbarClicked() {
      this.clearSnackbarValues()
    },
    clearSnackbarValues() {
      this.massSignItems.completedItemsCount = 0
      this.massSignItems.successSignedItems = 0
      this.massSignItems.failedSignedItems = 0

      this.showSnackbar = false
    },
    clearSend() {
      this.sendDialog = false
      this.sendHashCode = ''
    },
    onSendCancel() {
      this.clearSend()
    },
    onSendClicked() {
      this.sendDialog = true
    },
    onDeleteClicked() {
      this.deleteCardDialog = true
    },
    deleteItemConfirm() {
      this.deleteMultipleItems()
      this.deleteCardDialog = false
    },
    closeDeleteCardDialog() {
      this.deleteCardDialog = false
    },
    deleteSingleItem(id) {
      CardService.delete(id)
          .then(() => {
            this.isDeleteCardSuccess = true
          })
      this.updateItems();
    },
    deleteMultipleItems() {
      const selectedIds = this.selectedItems.map(mail => mail.id);
      CardService.deleteMany(selectedIds)
          .then(() => {
            this.isDeleteCardSuccess = true;
            this.updateItems();
          })
          .catch(error => {
            console.error('Error deleting mails:', error);
            this.isDeleteCardSuccess = false;
          });
    },
    updateItems() {
      this.$emit("update", this.options, this.filters)
      this.updateRouteQuery(this.options, this.filters)
    },
    updateRouteQuery(options, filters) {
      const {sortBy, sortDesc, page, itemsPerPage} = options;
      const {status, start, end} = filters;

      let routeQuery = {}

      // options
      if (!sortBy) {
        this.options.sortBy = ['createdOn']
      }
      if (!sortDesc) {
        this.options.sortDesc = [true]
      }
      if (!page) {
        this.options.page = 1
      }
      if (!itemsPerPage) {
        this.options.itemsPerPage = 50
      }

      routeQuery.sortBy = sortBy?.length === 1 ? sortBy[0] : sortBy
      routeQuery.sortDesc = sortDesc?.length === 1 ? sortDesc[0] : sortDesc
      routeQuery.page = page ?? page
      routeQuery.itemsPerPage = itemsPerPage ?? itemsPerPage

      // filters
      if (status) {
        routeQuery.status = status
      }
      if (start) {
        routeQuery.start = start
      }
      if (end) {
        routeQuery.end = end
      }

      this.$router.push({name: this.$route.name, query: routeQuery}).catch(error => {
        console.log(error)
      })
    },

    onFiltersChanged() {
      if (this.options.page !== 1)
        this.options.page = 1;
      else
        this.updateItems();
    },
    onRefreshButtonClicked() {
      this.updateItems();
    },
    onFilterStartChanged() {
      if (this.filters.start) {
        this.filterStartDisplayValue = Moment(this.filters.start, 'YYYY-MM-DD').format('DD.MM.YYYY')
      } else {
        this.filterStartDisplayValue = ''
      }

      this.filterStartMenu = false
      this.updateItems()
    },
    onFilterEndChanged() {
      if (this.filters.end) {
        this.filterEndDisplayValue = Moment(this.filters.end, 'YYYY-MM-DD').format('DD.MM.YYYY')
      } else {
        this.filterEndDisplayValue = ''
      }

      this.filterEndMenu = false
      this.updateItems()
    },
    onChangeFilterStartDisplayValue() {
      this.filters.start = null;
      this.updateItems()
    },
    onChangeFilterEndDisplayValue() {
      this.filters.end = null;
      this.updateItems()
    },
    onStatusFilterChanged() {
      this.filters.statusType = null
      this.onFiltersChanged()
    }
  },
  created() {
    if (this.$route.query) {
      // options
      if (this.$route.query.sortBy) {
        this.options.sortBy = []
        const sortBy = this.$route.query.sortBy
        this.options.sortBy.push(sortBy)
      }
      if (this.$route.query.sortDesc) {
        this.options.sortDesc = []
        let val = formatter.stringToBoolean(this.$route.query.sortDesc)
        this.options.sortDesc.push(val)
      }
      if (this.$route.query.page) {
        this.options.page = formatter.stringToNumber(this.$route.query.page)
      }
      if (this.$route.query.itemsPerPage) {
        this.options.itemsPerPage = formatter.stringToNumber(this.$route.query.itemsPerPage)
      }

      // filters
      if (this.$route.query.start) {
        this.filters.start = this.$route.query.start
        this.filterStartDisplayValue = Moment(this.filters.start, 'YYYY-MM-DD').format('DD.MM.YYYY')
      }
      if (this.$route.query.end) {
        this.filters.end = this.$route.query.end
        this.filterEndDisplayValue = Moment(this.filters.end, 'YYYY-MM-DD').format('DD.MM.YYYY')
      }
      if (this.$route.query.statusType) {
        this.filters.statusType = _.find(StatusTypes, s => {
          return s._id === formatter.stringToNumber(this.$route.query.statusType)
        })

        this.onStatusFilterChanged()
      }
    }
  },
  watch: {
    options: {
      handler() {
        this.updateItems()
      }
    }
  }
}
</script>

<style scoped>

</style>
