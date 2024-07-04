import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dialogChanges: Subject<boolean> = new Subject<boolean>();
  constructor() { }

  readJsonFile(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {
        try {
          const json = JSON.parse(event.target.result);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsText(file);
    });
  }
  
}
