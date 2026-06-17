import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {}

  ngOnInit(): void {
    // Initialize the form with default values
    this.reservationForm = this.formBuilder.group({
      checkInDate: [this.getDefaultDate(), Validators.required],
      checkOutDate: [this.getDefaultDate(), Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
  }

  // Helper method to keep date generation DRY (Don't Repeat Yourself)
  private getDefaultDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Helper method to get the reset state object
  private getFormDefaults() {
    const today = this.getDefaultDate();
    return {
      checkInDate: today,
      checkOutDate: today,
      guestName: '',
      guestEmail: '',
      roomNumber: ''
    };
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const newReservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(newReservation);
      
      // Reset back to the clean, default state
      this.reservationForm.reset(this.getFormDefaults());
    }
  }
}