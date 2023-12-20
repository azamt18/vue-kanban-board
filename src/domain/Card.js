export default class {
    _id;
    _title;
    _description;
    _createdOn;
    _updatedOn;
    _activeStatus;
    _statusPerformedOn;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get createdOn() {
        return this._createdOn;
    }

    set createdOn(value) {
        this._createdOn = value;
    }

    get updatedOn() {
        return this._updatedOn;
    }

    set updatedOn(value) {
        this._updatedOn = value;
    }

    get activeStatus() {
        return this._activeStatus;
    }

    set activeStatus(value) {
        this._activeStatus = value;
    }

    get statusPerformedOn() {
        return this._statusPerformedOn;
    }

    set statusPerformedOn(value) {
        this._statusPerformedOn = value;
    }
}
