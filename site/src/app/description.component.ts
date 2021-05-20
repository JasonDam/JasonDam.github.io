import {Component} from '@angular/core';
import { DescriptionService } from './description.service';

@Component({
    selector: 'description',
    template: `
        <h2>{{ title }}</h2>
        <ul>
            <li *ngFor="let project of projects">
                {{ project }}
            </li>
        </ul>    
    `
})
export class DescriptionComponent {
    title = "Description of site";
    projects;

    constructor(service: DescriptionService){
        this.projects = service.getDescription();
    }
    //logic for calling a HTTP service
}