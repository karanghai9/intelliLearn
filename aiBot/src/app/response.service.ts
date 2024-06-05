import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import axios, { Axios } from 'axios';
import { Environment } from './environment';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private popUpService : PopupService,
  ) {}

  async response(text: string,lang: string): Promise<[] | undefined> {
    const apiUrl = Environment.RESPONSE_API;
    const data = { "text" : text, "lang": lang};

    try {
        const response = await axios.post(apiUrl, data);
        return response.data?.response ;
    } catch (error) {
        this.popUpService.toast('Failed to fetch response.');
      console.error('Error:', error);

        return undefined; 
    }
 }

 async translate( conversation : any,targetLanguage : string) : Promise<[] |undefined>{

    const apiUrl = Environment.TRANSLATE_API;
    const data = {
      conversation : conversation,
      targetLang : targetLanguage,
      sourceLang : '',
    }
    try {
       const response = await axios.post (apiUrl,data);
       console.log(response.data);
       return response?.data?.translatedConversation;
    } catch (error) {
      this.popUpService.toast('Error while translating!Please Refresh');
      console.error('Error ',error);
      return undefined;
    }
 }


}
