import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job } from './job';

@Component({
  selector: 'sixsr-home',
  styles: [`
    .selected {
        background-color: #CFD8DC !important;
        color: white;
    }
  `],
  template: `
    <h2>Work Experience &amp; Projects:</h2>
    <ul class="jobs">
        <li *ngFor="let job of jobs">
            <span class="jobname">{{job.name}}</span> |
            <span class="jobtitle">{{job.title}}</span>
        </li>
    </ul>

  `,
  providers: [JobService]
})

export class AppComponent implements OnInit {
    jobs: Job[];

    constructor(private jobService: JobService) { }

    ngOnInit(): void {
        this.getJobs();
    }

    getJobs(): void {
        this.jobService.getJobs().then(jobs => this.jobs = jobs);
    }
}

