import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Job, JobDetail } from './job';

@Injectable()
export class JobService {

    private jobsUrl = 'api/jobs';
    private jobDetailUrl = 'api/job/';

    constructor(private http: HttpClient) { }

    getJobs(): Promise<Job[]> {
        return this.http.get(this.jobsUrl)
            .toPromise()
            .then(response => response as Job[])
            .catch(this.handleError);
    }

    getJobDetail(id: number): Promise<JobDetail[]> {
        return this.http.get(this.jobDetailUrl + id)
            .toPromise()
            .then(response => response as JobDetail[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
