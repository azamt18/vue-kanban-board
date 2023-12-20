<template>
  <v-card class="elevation-12">
    <CardsDataTable
        :loading="loading"
        :mails="mails"
        :total="total"
        :allowed-unit-page="true"
        :allow-mass-delete="false"
        @update="onUpdate"
    />
  </v-card>
</template>

<script>
import {
  LAYOUT_LOADING_START,
  LAYOUT_LOADING_STOP,
  LAYOUT_TITLE_CHANGED
} from "@/store/modules/layout/actions";
import CardService from "../../../services/card.service";
import Moment from "moment";
import _ from "underscore";
import Mapper from "../../../mappers";
import CardsDataTable from "@/components/mail/CardsDataTable";

export default {
  name: "ActiveCardsListingPage",
  components: {
    CardsDataTable
  },
  data() {
    return {
      mails: [],
      total: 0,
      loading: false,
    }
  },
  methods: {
    reloadCards(options, filters) {
      this.loading = true;
      this.$store.dispatch(LAYOUT_LOADING_START)

      const {sortBy, sortDesc, page, itemsPerPage} = options;
      const {start, end, statusType} = filters;

      const skip = (page - 1) * itemsPerPage;

      CardService.get({
        skip: skip,
        limit: itemsPerPage,
        sort: sortBy.length === 1 ? sortBy[0] : null,
        desc: sortDesc.length === 1 ? sortDesc[0] : null,
        createdStart: start ? Moment(start, 'YYYY-MM-DD') : null,
        createdEnd: end ? Moment(end, 'YYYY-MM-DD') : null,
        statusType: statusType
      })
          .then(response => {
            this.mails = _.map(response.data.Records, mailViewModel => {
              return Mapper.mapCard(mailViewModel)
            })

            this.total = response.data.Total;
          })
          .finally(() => {
            this.loading = false;
            this.$store.dispatch(LAYOUT_LOADING_STOP)
          })
    },
    onUpdate(options, filters) {
      this.reloadCards(options, filters)
    }
  },
  created() {
    this.$store.dispatch(LAYOUT_TITLE_CHANGED, 'Active cards')
  }
}
</script>

<style scoped>

</style>
