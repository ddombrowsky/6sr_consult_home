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
        <li *ngFor="let job of jobs" (click)="onSelect(job)">
            <span class="jobname">{{job.name}}</span> |
            <span class="jobtitle">{{job.title}}</span>
            <div *ngIf="expandedJob[job.id] == true">
            <ul>
                <li>a</li>
                <li>b</li>
            </ul>
            </div>
        </li>
    </ul>

  `,
  providers: [JobService]
})

export class AppComponent implements OnInit {
    jobs: Job[];
    expandedJob: boolean[];

    constructor(private jobService: JobService) { }

    ngOnInit(): void {
        this.expandedJob = [];
        this.getJobs();
    }

    getJobs(): void {
        this.jobService.getJobs().then(jobs => {
            this.jobs = jobs;
            for (let i = 0; i < jobs.length; i++) {
                this.expandedJob[jobs[i].id] = false;
            }
        });
    }

    onSelect(job: Job): void {
        // toggle showing of details
        this.expandedJob[job.id] = !this.expandedJob[job.id];
    }
}

