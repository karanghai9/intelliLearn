import { Injectable } from '@angular/core';
import { Environment } from './environment';
import axios, { Axios } from 'axios';
import { PopupService } from './popup.service';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor( private popUpService :PopupService) { }

  async generateOtp(email: string): Promise<string | undefined> {
    const apiUrl = Environment.SEND_OTP_API;
    const data = {"email" : email };

    try {
      const response = await axios.post(apiUrl, data);
      const otp = response.data.Otp?.toString();
      this.popUpService.toast('OTP has been sent Successfully.','Dismiss');
      console.log('OTP sent is ',otp);
      return otp;
    } catch (error) {
      
      this.popUpService.toast('OTP not sent, Please try again later.','Dismiss');  
      return undefined; 
    }
  }
}