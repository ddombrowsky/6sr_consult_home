import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';
import { Job, JobDetail } from './job';

@Component({
  selector: 'sixsr-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

