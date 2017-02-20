import { Injectable } from '@angular/core';
import { Job } from './job';

const testjobs: Job[] = [
    { id: 1, name: "Paylock IPT LLC", title: "Integrations Software Engineer"},
    { id: 2, name: "Red Lion Controlls", title: "Embedded Systems Developer" }
];

@Injectable()
export class JobService {
    getJobs(): Job[] {
        return testjobs;
    }
}
