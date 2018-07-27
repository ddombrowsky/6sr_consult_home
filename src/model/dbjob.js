"use strict";
var DBJob = (function () {
    function DBJob(id, name, title) {
        this.id = id;
        this.name = name;
        this.title = title;
    }
    DBJob.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.name,
            title: this.title
        };
    };
    return DBJob;
}());
exports.DBJob = DBJob;
//# sourceMappingURL=dbjob.js.map