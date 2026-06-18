import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(localStorage.getItem("reservations")!) as Reservation[] : []

   }

  getReservations() : Reservation[] {
    return this.reservations;
  }

  getReservation(id: string) : Reservation | undefined {
    return this.reservations.find(rsv => rsv.id === id);
  }

  addReservation(newRrv: Reservation) : void {
    //if (this.reservations.findIndex(x => x.roomNumber == newRrv.roomNumber && newRrv.checkInDate >= x.checkInDate && newRrv.checkInDate <= x.checkOutDate))

    this.reservations.push(newRrv);
    this.storeToLocalStorage(this.reservations);

    console.log(this.reservations);
  }

  updateReservation(updatedReservation: Reservation) : Reservation | undefined  {
    const index = this.reservations.findIndex(x => x.id === updatedReservation.id);
    if (index) {
      this.reservations[index] = updatedReservation;
      this.storeToLocalStorage(this.reservations);

      return this.reservations[index];
    }
    return undefined;
  }

  deleteReservation(id: string) : void {
    const index = this.reservations.findIndex(rsv => rsv.id === id);
    this.reservations.splice(index, 1);
    this.storeToLocalStorage(this.reservations);
  }

  private storeToLocalStorage(reservations: Reservation[]) : void {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }
}
