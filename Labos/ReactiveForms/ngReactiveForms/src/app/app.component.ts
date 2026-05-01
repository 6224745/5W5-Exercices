import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

interface QuestionsData {
  questionA?: string;
  questionB?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, MatTabsModule, CommonModule, MatError, MatFormField, MatCard, MatInput],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngReactiveForms';

  formGroup: FormGroup<any>;
  data: QuestionsData | null = null;
  constructor(private formBuilder: FormBuilder){
    this.formGroup = this.formBuilder.group({
      questionA: ['', [Validators.required]],
      questionB: ['', [Validators.required]],
    }, {validators: this.catValidator});

    this.formGroup.valueChanges.subscribe(() => {
      this.data = this.formGroup.value;
    });
  }

  catValidator(control: AbstractControl): ValidationErrors | null {
    const questionA = control.get('questionA')?.value;
    const questionB = control.get('questionB')?.value;

    let atLeastOneMistake:boolean = false;

    if(questionA != ""){
      if(questionA != "chat") {
        control.get('questionA')?.setErrors({doesntLoveCats:true});
        atLeastOneMistake = true;
      } else {
        control.get('questionA')?.setErrors(null);
      }
    }

    if(questionB != ""){
      if(questionB != "oui") {
        control.get('questionB')?.setErrors({doesntPreferCats:true});
        atLeastOneMistake = true;
      } else {
        control.get('questionB')?.setErrors(null);
      }
    }

    return atLeastOneMistake?{atLeastOneMistake:true}:null;
  }
}
