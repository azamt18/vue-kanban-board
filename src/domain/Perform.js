export default class {
    _id;
    _createdOn;
    _performedOn;
    _note;
    _performType;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get createdOn() {
        return this._createdOn;
    }

    set createdOn(value) {
        this._createdOn = value;
    }

    get performedOn() {
        return this._performedOn;
    }

    set performedOn(value) {
        this._performedOn = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }

    get performType() {
        return this._performType;
    }

    set performType(value) {
        this._performType = value;
    }
}
