import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: UserSettings = {
    name: 'Milton',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Annual',
    notes: 'here are some notes...',
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError: boolean = false;
  postErrorMessage: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.message;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        (result) => console.log('success: ', result),
        (error) => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = 'Please fix the above errors.';
    }
  }
}
