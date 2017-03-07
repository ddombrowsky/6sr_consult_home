
import {
    Spindle,
    ConsoleTowerDisplay
       } from './hanoi';

let ht = 20;
let a = new Spindle(ht);
let b = new Spindle(ht);
let c = new Spindle(ht);
let cdisp = new ConsoleTowerDisplay(ht + 2);


for (let i = ht; i > 0; i--) {
    a.push(i);
}

function display(round: number) {

    // clear screen
    if (process.stdout.write('\x1Bc')) {
        a.render(cdisp);
        b.render(cdisp);
        c.render(cdisp);

        console.log('rounds: ' + round);

        // show towers
        cdisp.show();

        let i = 1000;
        while(i-->0 && process.stdout.write('.\x0d')) { }
    }
    cdisp.resetDisplay();

}

let round = 1;

// Move nMove disks from src to dst.
function solve3towers(src: Spindle, dst: Spindle, store: Spindle,
                      nMove: number) {

    if (nMove <= 0) {
        process.stdout.write('\n');
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
process.stdout.write(' ', () => {display(round);});
