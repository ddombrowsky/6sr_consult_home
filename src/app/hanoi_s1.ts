
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
        this.disp = [];
    }

    private disp: string[];
}

let ht = 13;
let a = new Spindle(ht);
let b = new Spindle(ht);
let c = new Spindle(ht);
let cdisp = new ConsoleTowerDisplay(ht + 2);


for (let i = ht; i > 0; i--) {
    a.push(i);
}

function display(round: number) {
    a.render(cdisp);
    b.render(cdisp);
    c.render(cdisp);

    // clear screen
    process.stdout.write('\x1Bc');

    console.log('rounds: ' + round);

    // show towers
    cdisp.show();

    cdisp.resetDisplay();

    let i = 1000;
    while(i-->0){
        process.stdout.write('.\x0d');
    }
}

let round = 1;

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

    display(round);
    round++;

    // move other disks to dst
    solve3towers(store, dst, src, nMove - 1);

}

solve3towers(a, c, b, a.length());
