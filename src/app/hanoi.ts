
export interface TowerDisplay {
    renderLine(length: number);
}

export class Spindle {
    constructor() {
        this.stack = [];
    }

    public peek(): number {
        if (this.length() > 0) {
            return this.stack[this.stack.length - 1];
        } else {
            return -1;
        }
    }

    public push(n: number) {
        let c = this.peek();
        // only allow smaller numbers to be pushed on
        // top of larger ones.
        if (c < 0 || n < c) { 
            this.stack.push(n);
        } else {
            throw 'cannot push large # onto a smaller one';
        }
    }

    public pop(): number {
        if (this.length() > 0) {
            return this.stack.pop();
        }
        return -1;
    }

    public length(): number {
        return this.stack.length;
    }

    public render(disp: TowerDisplay) {
        if (this.length() <= 0) {
            disp.renderLine(0);
            return;
        }

        let i = this.stack.length - 1;
        while (i >= 0) {
            disp.renderLine(this.stack[i]);
            i--;
        }
    }

    public popTo(dest: Spindle) {
        dest.push(this.pop());
    }

    private stack: number[];
}


