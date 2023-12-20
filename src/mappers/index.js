import Perform from "@/domain/Perform";
import * as Statuses from '@/enums/status.type'
import Moment from 'moment'
import _ from 'underscore'
import Card from "@/domain/Card";
import {DATE_TIME_FORMAT} from "@/contants/date-formats";

let mapPerformType = (performType) => {
    let keys = _.keys(Statuses)
    let performKey = _.find(keys, key => {
        return Statuses[key].id === performType;
    })

    return Statuses[performKey];
}

let mapPerformViewModel = (performViewModel) => {
    if (performViewModel) {
        let perform = new Perform()

        perform.id = performViewModel.Id;
        perform.createdOn = Moment(performViewModel.CreatedOnStr, 'YYYY-MM-DD HH-mm-ss');
        perform.performedOn = Moment(performViewModel.PerformedOnStr, 'YYYY-MM-DD');
        perform.note = performViewModel.Note;
        perform.performType = mapPerformType(performViewModel.Type)
        perform.courier = performViewModel.Courier
        perform.postIndex = performViewModel.PostIndex

        return perform
    }
    return null
}

let mapDateTime = dateTimeViewModel => {
    if (dateTimeViewModel)
        return Moment(dateTimeViewModel, DATE_TIME_FORMAT)
    return null
}

let mapCardViewModel = cardViewModel => {
    if (cardViewModel) {
        let card = new Card()

        card.id = cardViewModel.id
        card.title = cardViewModel.title
        card.description = cardViewModel.description
        card.createdOn = mapDateTime(cardViewModel.createdOn)
        card.updatedOn = mapDateTime(cardViewModel.updatedOn)

        return card
    }

    return null
}

export default {
    mapCard: mapCardViewModel,
    mapPerformType: mapPerformType,
}
