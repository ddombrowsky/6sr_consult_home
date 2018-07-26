import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job, JobDetail } from './job';

@Component({
  selector: 'sixsr-home',
  styles: [`
    .jobtitle {
        cursor: pointer
    }
  `],
  template: `
    <p>Work Experience &amp; Projects:</p>
    <ul class="jobs">
        <li class="jobentry" *ngFor="let job of jobs">
            <span class="jobname">{{job.name}}</span> |
            <span class="jobtitle" (click)="onSelect(job)">{{job.title}}</span>
            <div class="jobdetailblock" *ngIf="expandedJob[job.id] == true">
            <ul>
                <li *ngFor="let detail of job.details">
                    <span class="jobdetail">{{detail.desc}}</span>
                </li>
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
        // fetch details
        if (job.details == null || job.details.length == 0) {
            job.details = [{desc: "Loading..."} as JobDetail];

            this.jobService.getJobDetail(job.id).then(details => {
                job.details = details;
            });
        }

        // toggle showing of details
        this.expandedJob[job.id] = !this.expandedJob[job.id];
    }
}

