import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Job, JobDetail } from './job';

@Injectable()
export class JobService {

    private jobsUrl = 'api/jobs';
    private jobDetailUrl = 'api/job/';

    constructor(private http: Http) { }

    getJobs(): Promise<Job[]> {
        return this.http.get(this.jobsUrl)
            .toPromise()
            .then(response => response.json() as Job[])
            .catch(this.handleError);
    }

    getJobDetail(id: number): Promise<JobDetail[]> {
        return this.http.get(this.jobDetailUrl + id)
            .toPromise()
            .then(response => response.json() as JobDetail[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
