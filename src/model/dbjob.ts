
export class DBJob {
    constructor(
        public id: number,
        public name: string,
        public title: string,
    ) { }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            title: this.title
        };
    }
}
