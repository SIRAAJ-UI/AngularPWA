import { Component, OnInit } from "@angular/core";
import { Guest } from "../guest.model";
import { GuestService } from "../guest.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-scanner",
  templateUrl: "./scanner.component.html",
  styleUrls: ["./scanner.component.scss"]
})
export class ScannerComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: Guest;
  guestExist: boolean;
  validQrCode: boolean;
  qrCode: string;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    // const qrString = "Student 160622,QB Id: 14909";
    // // const qrString = "QB Id: 14909";
    // this.onQrCodeValidationCheck(qrString);
  }

  clearResult(): void {
    this.qrResult = null;
  }

  onQrCodeValidationCheck(qrString){
    try{
      const firstSet = qrString.split(",");
      let validResponse = [];
      let props = ["StudentId","QuestionId"]
      firstSet.forEach( (s,index) => {
        const prop = props[index];
        const value = s.split(":")[1];
        if(value && value !== undefined){
          let propValue:any = { };
          propValue[prop] = String(value).trim();
          validResponse.push(propValue)
        } else {
        }
      })
      console.log(validResponse)
      if(validResponse.length === 2){
        // Valid Qr Code!
        this.validQrCode = true;
        this.clearMessage();
      } else {
        console.log(validResponse)
        // InValid Qr Code!
        this.validQrCode = false;
        this.clearMessage();

      }
    } catch {
      this.validQrCode = false;
      this.clearMessage();
      // InValid Qr Code!
    }
    
  }
  onCodeResult(resultString: string): void {
    this.validQrCode = null;
    this.onQrCodeValidationCheck(resultString);
    // this.qrCode = resultString;
    // this.guestExist = null;
    // if (this.checkQRJSON(resultString)) {
    //   this.qrResult = JSON.parse(resultString);
    //   // this.checkInGuest();
    //   // this.clearMessage();
    // } else {
    //   this.guestExist = false;
    //   this.clearMessage();
    // }
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  // checkInGuest(): void {
  //   this.guestService.guests$
  //     .pipe(
  //       map(guests =>
  //         guests.find((guest: Guest) => guest.id === this.qrResult.id)
  //       )
  //     )
  //     .subscribe(guest => {
  //       if (guest !== null && guest !== undefined) {
  //         this.guestExist = true;
  //       } else {
  //         this.guestExist = false;
  //       }
  //       this.clearResult();
  //       this.clearMessage();
  //     });
  // }

  clearMessage() {
    setTimeout(() => {
      this.validQrCode = null;
    }, 3000);
  }

  checkQRJSON(qrString: string): boolean {
    if (
      /^[\],:{}\s]*$/.test(
        qrString
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]"
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
}
