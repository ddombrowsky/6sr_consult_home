
import {
    Spindle,
    TowerDisplay
       } from './hanoi';

class ConsoleTowerDisplay implements TowerDisplay {
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
        this.disp = [];
    }

    private disp: string[];
}

let a = new Spindle(7);
let b = new Spindle(7);
let c = new Spindle(7);
let cdisp = new ConsoleTowerDisplay(10);

a.push(7);
a.push(6);
a.push(5);
a.push(4);
a.push(3);
a.push(2);
a.push(1);

function display() {
    a.render(cdisp);
    b.render(cdisp);
    c.render(cdisp);

    cdisp.show();
    cdisp.resetDisplay();
}

let round = 0;

// Move nMove disks from src to dst.
function solve3towers(src: Spindle, dst: Spindle, store: Spindle,
                      nMove: number) {

    if (nMove <= 0) {
        return;
    }

    // move other disks to store
    solve3towers(src, store, dst, nMove - 1);

    // move bottom disk to dst (should never fail)
    src.popTo(dst);

    console.log('rounds: ' + round);
    round++;
    display();

    // move other disks to dst
    solve3towers(store, dst, src, nMove - 1);

}

solve3towers(a, c, b, a.length());
