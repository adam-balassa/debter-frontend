import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable({providedIn: 'root'})
export class LanguageService{
    language: string = 'en';

    constructor(routerLink: ActivatedRoute){
        routerLink.url.subscribe( e => {
        })
        
    }
}