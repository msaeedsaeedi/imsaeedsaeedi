import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class contactService {
  private http = inject(HttpClient);
  private apiEndpoint = `${environment.apiEndpoint}/contact`;

  sendResponse(email: string, subject: string, message: string, turnstileToken: string) {
    return this.http.post(this.apiEndpoint, { 
      email, 
      subject, 
      message, 
      token: turnstileToken 
    });
  }
}
