import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Button } from '../../components/button/button';
import { contactService } from '../../services/contact-service';
import { ToastrService } from 'ngx-toastr';
import { NgxTurnstileFormsModule, NgxTurnstileModule } from 'ngx-turnstile';
import { environment } from '../../../environments/environment';

interface ContactForm {
  email: FormControl<string>;
  subject: FormControl<string>;
  message: FormControl<string>;
  token: FormControl<string>;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Button, NgxTurnstileModule, NgxTurnstileFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private contactService = inject(contactService);
  private toastService = inject(ToastrService);

  protected contactForm = new FormGroup<ContactForm>({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    subject: new FormControl('', { validators: Validators.required, nonNullable: true }),
    message: new FormControl('', { validators: Validators.required, nonNullable: true }),
    token: new FormControl('', { nonNullable: true }),
  });

  protected isSubmitting = signal(false);
  protected isSuccessful = signal(false);
  protected readonly siteKey = signal(environment.turnstilePublicKey);
  protected turnstileToken = signal<string>('');

  onTurnstileToken(token: string | null) {
    if (token === null) return;
    this.turnstileToken.set(token);
    this.contactForm.get('token')?.setValue(token);
  }

  private submitWithToken() {
    const token = this.turnstileToken();
    if (!token) return;

    this.isSubmitting.set(true);
    const data = this.contactForm.value;
    this.contactService.sendResponse(data.email!, data.subject!, data.message!, token).subscribe({
      next: (value) => {
        console.log(value);
        this.isSubmitting.set(false);
        this.isSuccessful.set(true);

        // Reset form after success animation
        setTimeout(() => {
          this.contactForm.reset();
          this.isSuccessful.set(false);
          this.turnstileToken.set('');
        }, 10000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.toastService.error('Failed to send message. Please try again.');
        console.error(err);
        // Reset turnstile on error
        this.turnstileToken.set('');
        this.contactForm.get('token')?.setValue('');
      },
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      this.toastService.error('Please fill in all required fields.');
      return;
    }

    const token = this.contactForm.value.token;
    if (!token) {
      this.toastService.error('Please complete the captcha.');
      return;
    }

    // If we have a token, submit
    this.submitWithToken();
  }
}
