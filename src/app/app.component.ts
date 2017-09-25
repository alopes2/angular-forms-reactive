import { resolve } from 'path';
import { setTimeout } from 'timers';
import { Observable } from 'rxjs/Rx';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Anna', 'Chris'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      // wraping as a string just be sure it won't get destroyed when minified
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, , this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges
    //   .subscribe(
    //     value => {
    //       console.log(value);
    //     }
    //   );
    this.signupForm.statusChanges
      .subscribe(
        status => {
          console.log(status);
        }
      );
      this.signupForm.setValue({
        'userData': {
          'username': 'Andre',
          'email': 'yo@yo.com'
        },
        'gender': 'female',
        'hobbies': []
      });
      this.signupForm.patchValue({
        'userData': {
          'username': 'Anne'
        }
      });
  }

  onSubmit() {
    console.log(this.signupForm);
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm
      .get('hobbies'))
      .push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }
}
