import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});
  
  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.reservationForm = this.formBuilder.group({
      checkInDate: [today, Validators.required],
      checkOutDate: [today, Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log("Valid!")
  }
}
