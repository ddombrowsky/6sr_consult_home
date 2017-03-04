
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
            throw new Error('cannot push large # onto a smaller one');
        }
    }

    public pop(): number {
        if (this.length() > 0) {
            return this.stack.pop();
        } else {
            throw new Error('pop of empty stack');
        }
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

export class ConsoleTowerDisplay implements TowerDisplay {
    // radius is the number of spaces before the center pole
    constructor(private radius: number) {
        this.disp = [];
    }

    renderLine(length: number, height: number) {
        let cen = this.radius;
        let pad = cen - length;
        let outstr = '';
        let i = 0;

        for ( ; i < pad; i++) {
            outstr += ' ';
        }

        for ( ; i <= (this.radius * 2) - pad ; i++) {
            if (i == cen) {
                if (length > 0) {
                    // center the length string in the display
                    outstr += length;
                    if (length > 9) {
                        // 2-digit length
                        i++;
                    }
                } else {
                    outstr += ' ';
                }
            } else {
                outstr += '=';
            }
        }

        for ( ; i <= this.radius * 2 ; i++) {
            outstr += ' ';
        }

        outstr += '|';
        if (this.disp[height] == undefined) {
            this.disp[height] = '';
        }

        // Append this string to the list of strings for this height.
        // This allows us to display the towers side-by-side.
        this.disp[height] += outstr;
    }

    public show() {
        let i = this.disp.length - 1;

        while (i >= 0) {
            if (this.disp[i] == undefined) {
                this.disp[i] = '';
                for(let j = 0; j < (this.radius * 2) + 1; j++) {
                    this.disp[i] += ' ';
                }
            }
            console.log(this.disp[i]);
            i--;
        }
    }
    public resetDisplay() {
        for (let i = 0 ; i < this.disp.length; i++) {
            this.disp[i] = '';
        }
    }

    private disp: string[];
}


