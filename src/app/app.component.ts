import {Component} from '@angular/core';
import {AppService} from './app.service';
import {Action} from './actions';
import {Observable} from "rxjs";
import {Video} from './videos'
@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    providers: [AppService]
})

export class AppComponent {
    constructor(private appService: AppService) {
    }
    public i = 0;
    public linkUrl = "https://media.frequency.com/UC6zPzUJo8hu-5TzUk8IEC2Q/Zefh3FjYMqs.mp4";
    public n = 0;
    public types = ["cut", "fadevideo", "fadeaudio", "Add video", "Add audio"];
    public files = ["fade1.mp3", "fade2.mp3", "endcard1.mp4", "endcard2.mp4"]
    public listactions: Action[] = [];
    public videos :Video = new Video();
    public resultVideo ="";

    public  pattern= new RegExp("[0-9]{2}:[0-5]{1}[0-9]{1}");
    // public step = 1;
    public addStep(i: any) {
        this.listactions.push(new Action());
        this.listactions[this.n].index = this.n + 1;
        this.n++;
    }
    public removeStep(i:any){
    this.listactions.splice(i,1);
    }

    public body = {
        video :this.videos,
        actions: this.listactions
    };
    public checkPattern(value: string):boolean{
        return this.pattern.test(value);
    }
    public submit() {
        // this.body.video = this.videos;
        this.videos.link = this.linkUrl;
        // console.log(this.body);
        for(let i=0;i<this.listactions.length;i++){
            if(!this.checkPattern(this.listactions[i].start)) {
                // alert("Step: "+(i+1)+", From time wrong format, please check again");
                document.getElementsByClassName("start")[i].classList.add("error");
                // console.log(document.getElementsByClassName("start")[i]);
                return;
            }
            if(!this.checkPattern(this.listactions[i].end)) {
                // alert("Step: "+(i+1)+", End time wrong format, please check again");
                document.getElementsByClassName("end")[i].classList.add("error");
                return;
            }
        }
        let res: Observable<any> = this.appService.submitData('text', this.body);
        res.subscribe(
            result => {
                console.log("response: " + result);
                alert("Success");
                this.resultVideo =result;
            }
        );
        // console.log(this.body);
        // console.log(res);
    }
}
