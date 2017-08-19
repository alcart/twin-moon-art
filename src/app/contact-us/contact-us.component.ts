import {Component,Renderer2} from '@angular/core'
import {FormGroup,FormBuilder,Validators} from '@angular/forms'

export class ContactInfo {
  name: string;
  description: string;
  email: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: 'contact-us.component.html',
  styleUrls: ['contact-us.component.css']
})

export class AppContactComponent {
  contactInfo = new ContactInfo();
  contactForm: FormGroup;
  information: string;
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }
  submitInfo(event) {
    if (this.contactForm.valid) {
      this.contactInfo.name = this.contactForm.get('name').value;
      this.contactInfo.description = this.contactForm.get('phone').value;
      this.contactInfo.email = this.contactForm.get('email').value;
      // this.connect.sendEmail(this.contactInfo)
      // .then(res => {this.information = res.text()})
      // .catch(error => {this.information = "Error Has Occurred"});
      // ga('send', 'event', {
      //   eventCategory: 'Submit Form',
      //   eventLabel: 'Form Submitted'
      // })
      this.contactForm.reset()
    }
  }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.contactForm = this.fb.group({
      'name': [this.contactInfo.name, [
        Validators.required
      ]],
      'email': [this.contactInfo.email, [
        Validators.required,
        Validators.email
      ]],
      'description': [this.contactInfo.description, [
        Validators.required
      ]]
    })
    this.contactForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  onValueChanged(data?: any){
    if (!this.contactForm){ return ;}
    const form = this.contactForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid){
        const message = this.errorMessage[field];
        for (var key in control.errors){
          this.formErrors[field] += message[key]+ ' ';
        }
      }
    }
  }

  formErrors = {
    "name": '',
    "email": '',
    "description": ''
  }

  errorMessage = {
    'name': {
      'required': 'Name is required'
    },
    'description': {
      'required': 'Description is required',
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email is invalid'
    }
  }
}
