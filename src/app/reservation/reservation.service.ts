import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  private reservations: Reservation[] = [];

  getReservations() : Reservation[] {
    return this.reservations;
  }

  getReservation(id: string) : Reservation | undefined {
    return this.reservations.find(rsv => rsv.id === id);
  }

  addReservation(newRrv: Reservation) : void {
    this.reservations.push(newRrv);
    console.log(this.reservations);
  }

  updateReservation(updatedReservation: Reservation) : Reservation | undefined  {
    const index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    if (index) {
      this.reservations[index] = updatedReservation;
      return this.reservations[index];
    }
    return undefined;
  }

  deleteReservation(id: string) : void {
    const index = this.reservations.findIndex(rsv => rsv.id === id);
    this.reservations.splice(index, 1);
  }
}
