import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Country, State, City }  from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city'
import { Address } from 'src/app/Models/address.model';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  states: IState[] = [];
  cities: ICity[] = [];
  address: Address = {
    address: '',
    city: '',
    state: '',
    additionalInformation:''
  };
  userHasAddress = false;
  showUpdateForm: boolean = false;
  userName = this.auth.getUserName();
  userPhone = this.auth.getUserPhone();
  constructor(public shared: SharedService, public auth: AuthService) { }

  ngOnInit(): void {
    this.states = State.getStatesOfCountry("TN").map(state => {
      return {
        ...state,
        name: state.name.replace(' Governorate', '')
      };
    });
    this.getAddress()
  }

    addAddress(): void {
      this.shared.addAddress(this.address)
        .subscribe(
          response => {
            console.log('Address created successfully:', response);
            Swal.fire({
              title: "ADDRESS ADDED SUCCESSFULLY",
              width: 600,
              background: "#eec2c9",
              color: "black",
              showConfirmButton: false,
              timer: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error => {
            console.error('Error creating address:', error);
            Swal.fire({
              icon: 'error',
              title: 'Invalid address',
              text: error.error.message || 'Please try again.',
              background:'#efafb9',
              showConfirmButton: true,
              confirmButtonColor:"black"
            });          }
        );
    }
    deleteAddress(): void {
      this.shared.deleteAddress()
        .subscribe(
          response => {
            console.log('Address deleted successfully:', response);
            Swal.fire({
              title: "ADDRESS DELETED SUCCESSFULLY",
              width: 600,
              background: "#eec2c9",
              color: "black",
              showConfirmButton: false,
              timer: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error => {
            console.error('Error deleting address:', error);
            Swal.fire({
              icon: 'error',
              title: 'ADDRESS NOT DELETED',
              text: error.error.message || 'Please try again.',
              background:'#efafb9',
              showConfirmButton: true,
              confirmButtonColor:"black"
            });          }
        );
    }
    updateAddress(): void {
      this.shared.updateAddress(this.address)
        .subscribe(
          response => {
            console.log('Address updated successfully:', response);
            Swal.fire({
              title: "ADDRESS UPDATED SUCCESSFULLY",
              width: 600,
              background: "#eec2c9",
              color: "black",
              showConfirmButton: false,
              timer: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error => {
            console.error('Error updating address:', error);
            Swal.fire({
              icon: 'error',
              title: 'ADDRESS NOT UPDATING',
              text: error.error.message || 'Please try again.',
              background:'#efafb9',
              showConfirmButton: true,
              confirmButtonColor:"black"
            });          }
        );
    }

    toggleUpdate(){
      this.showUpdateForm = !this.showUpdateForm;
      // this.updateAddressForm = this.address;
    }
    public getAddress(): void {
      const userId = this.auth.getUserID();
      if (userId) {
      this.shared.getSpecificAddress(userId)
        .subscribe(
          (response) => {
            this.address = response.data;
            this.userHasAddress = true;
            console.log('fetching address:');

          },
          (error) => {
            console.error('Error fetching address:', error);
            this.userHasAddress = false;

          }
        );
      }
    }
    onStateChange(stateCode: string): void {
      if (stateCode) {
        this.cities = City.getCitiesOfState("TN", stateCode);
        this.address.state = this.getStateName(stateCode); // Set state name in address
      } else {
        this.cities = [];
      }
    }
      // Function to get state name from code
  getStateName(stateCode: string): string {
    const state = this.states.find(state => state.isoCode === stateCode);
    return state ? state.name : ''; // Return state name or empty string if not found
  }
}
