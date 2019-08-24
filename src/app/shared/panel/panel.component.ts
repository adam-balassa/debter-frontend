import { Component, Input, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

interface PanelContent{
    title: string;
    description: string;
    redirectUrl: string;
    color: boolean;
}

@Component({
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: [ './panel.component.css' ]
})
export class PanelComponent implements OnInit{
    @Input('content') content: PanelContent;

    hover: boolean = false;
    constructor(private router: Router, private route: ActivatedRoute){}

    @HostListener('click')
    redirect(){
        this.router.navigate([this.content.redirectUrl], {relativeTo: this.route})
    }

    ngOnInit(){        
    }
}