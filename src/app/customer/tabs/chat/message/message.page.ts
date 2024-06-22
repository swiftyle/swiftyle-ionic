import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  selectedIssue: string = '';

  constructor() {}

  ngOnInit() {}

  selectIssue(issue: string) {
    this.selectedIssue = issue;
  }
}
