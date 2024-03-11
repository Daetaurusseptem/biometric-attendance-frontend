import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class BiometricService { 

  constructor(private http:HttpClient){}

  syncBiometricData(deviceIp: string): Observable<any> {
    const data = { deviceIp };
    return this.http.post('/api/biometric/sync', data);
  }
  
}
