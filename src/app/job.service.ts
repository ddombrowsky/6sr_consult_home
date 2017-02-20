import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Job } from './job';

@Injectable()
export class JobService {

    private jobsUrl = 'api/jobs';

    constructor(private http: Http) { }

    getJobs(): Promise<Job[]> {
        return this.http.get(this.jobsUrl)
            .toPromise()
            .then(response => response.json() as Job[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
