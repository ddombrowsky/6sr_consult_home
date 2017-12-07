
export interface TowerDisplay {
    renderLine(length: number, height: number);
}

export class Spindle {
    constructor(private maxheight: number) {
        this.stack = [];
    }

    public peek(): number {
        if (this.length() > 0) {
            return this.stack[this.stack.length - 1];
        } else {
            // can't return Number.MAX_SAFE_INTEGER; ?
            return Number.MAX_VALUE;
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
        let i = this.maxheight - 1;
        while (i >= 0) {
            if (this.stack[i] == undefined) {
                disp.renderLine(0, i);
            } else {
                disp.renderLine(this.stack[i], i);
            }
            i--;
        }
    }

    public popTo(dest: Spindle) {
        dest.push(this.pop());
    }

    private stack: number[];
}


