import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Data } from '@angular/router';

interface QuestionsData {
  name?: string | null ;
  roadnumber?: number | null ;
  rue?: string | null ;
  postalcode?: string | null ;
  comments?: string | null ;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatToolbarModule, CommonModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class AppComponent {
  title = 'reactive.form';

  questForm: FormGroup;
  questData?: QuestionsData;

  constructor(private fb: FormBuilder) {
    this.questForm = this.fb.group({
      name: ['', [Validators.required]],
      roadnumber: ['',[Validators.required, Validators.min(1000), Validators.max(9999)]],
      rue: ['',[Validators.required]],
      postalcode: ['',[Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      comments: ['', [this.minWordsValidator]],
    }, { validators: this.noNameInComments });

    this.questForm.valueChanges.subscribe(() => {
      this.questData = this.questForm.value;
    });
  }

  minWordsValidator(control: AbstractControl): ValidationErrors | null {
    const wordCount = control.value.split(' ').length;
    if(wordCount <= 10){
      return {minWords: true};
    }
    return null;
  }

  noNameInComments(control: AbstractControl): ValidationErrors | null {
    const name = control.get('name')?.value?.toLowerCase();
    const comments = control.get('comments')?.value?.toLowerCase();

    if (comments.includes(name)) {
      return { nameInComments: true };
    }
    return null;
  }
}


