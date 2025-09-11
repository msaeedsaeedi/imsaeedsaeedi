import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected contactForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    subject: new FormControl('', { validators: Validators.required }),
    message: new FormControl('', { validators: Validators.required }),
  });

  protected isSubmitting = signal(false);
  protected isSuccessful = signal(false);

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      // Simulate API call delay
      setTimeout(() => {
        console.log('Form Submitted: ', this.contactForm.value);
        this.isSubmitting.set(false);
        this.isSuccessful.set(true);
        
        // Reset form after success animation
        setTimeout(() => {
          this.contactForm.reset();
          this.isSuccessful.set(false);
        }, 10000);
      }, 1000);
    }
  }
}
