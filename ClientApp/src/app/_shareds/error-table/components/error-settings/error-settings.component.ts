import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';

@Component({
  selector: 'app-error-settings',
  templateUrl: './error-settings.component.html',
  styleUrls: ['./error-settings.component.scss']
})
export class ErrorSettingsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  onOpenStatusDialog() {
    this.dialog.open(StatusDialogComponent, {
      width: '250px',
      data: {name: 'test', animal: 'bla-bla'}
    }).afterClosed().subscribe(result => {
        if(result) {
          console.log(result);
        }      
    });
  }

}
