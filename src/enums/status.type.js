import StatusType from "../domain/Status";

export const Backlog = new StatusType(-10, 'Backlog')
export const Active = new StatusType(0, 'Active')
export const Review = new StatusType(10, 'Review')
export const Done = new StatusType(20, 'Done')
