
import {
    Spindle,
    TowerDisplay
       } from './hanoi';

class ConsoleTowerDisplay implements TowerDisplay {
    // radius is the number of spaces before the center pole
    constructor(private radius: number) { }

    renderLine(length: number) {
        let cen = this.radius;
        let pad = cen - length;
        let outstr = '';
        let i = 0;

        for ( ; i < pad; i++) {
            outstr += ' ';
        }

        for ( ; i <= (this.radius * 2) - pad ; i++) {
            if (i == cen) {
                outstr += length;
            } else {
                outstr += '=';
            }
        }

        for ( ; i <= this.radius * 2 ; i++) {
            outstr += ' ';
        }

        outstr += '|';
        console.log(outstr);
    }
}

let a = new Spindle();
let b = new Spindle();
let c = new Spindle();
let cdisp = new ConsoleTowerDisplay(10);

a.push(4);
a.push(3);
a.push(2);
a.push(1);

function display() {
    console.log("a:");
    a.render(cdisp);
    console.log("b:");
    b.render(cdisp);
    console.log("c:");
    c.render(cdisp);
}

display();

a.popTo(b);

display();
