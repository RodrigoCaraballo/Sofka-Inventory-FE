import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country, ICountry, IState, State } from 'country-state-city';
import jwt_decode from 'jwt-decode';
import { RegisterBranchUseCase } from 'src/app/domain/application/register-branch.use-case';
import { JWTModel } from 'src/app/domain/domain';
import { IRegisterBranchRequest } from 'src/app/domain/domain/branch.model';

@Component({
  selector: 'app-register-branch-form',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
  countries: ICountry[] = [];
  states: IState[] = [];
  selectedCountry?: ICountry;
  decodeUser?: JWTModel;
  errorMessage?: string;
  successMessage?: string;

  branchForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    country: ['', Validators.required],
    city: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerBranchUseCase: RegisterBranchUseCase
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = jwt_decode(token);
    this.decodeUser = parsedToken;
    this.countries = Country.getAllCountries();
  }

  getCities(event: Event): void {
    const selectedCountry: ICountry | undefined = this.countries.find(
      (country) => country.name === (event.target as HTMLSelectElement).value
    );

    if (!selectedCountry) {
      this.selectedCountry = undefined;
      return;
    }

    this.selectedCountry = selectedCountry;
    this.states = State.getStatesOfCountry(selectedCountry.isoCode);
  }

  registerBranch() {
    if (this.branchForm.valid) {
      this.registerBranchUseCase
        .execute(this.branchForm.value as IRegisterBranchRequest)
        .subscribe({
          next: () => {
            this.successMessage = 'Branch registered successfully';

            this.branchForm.reset();
            setTimeout(() => {
              this.successMessage = undefined;
            }, 2000);
          },
          error: (error: HttpErrorResponse) => {
            if (error.error?.message) {
              this.errorMessage = error.error?.message;

              setTimeout(() => {
                this.errorMessage = undefined;
              }, 2000);

              return;
            }

            this.errorMessage = 'Error trying to register branch';
            setTimeout(() => {
              this.errorMessage = undefined;
            }, 2000);
          },
        });
    }
  }
}
