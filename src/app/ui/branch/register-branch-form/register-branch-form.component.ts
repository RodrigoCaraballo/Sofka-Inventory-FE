import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Country, ICountry, IState, State } from 'country-state-city';
import { RegisterBranchUseCase } from 'src/app/domain/application';
import { IRegisterBranchRequest } from 'src/app/domain/domain/branch.model';

@Component({
  selector: 'app-register-branch-form',
  templateUrl: './register-branch-form.component.html',
  styleUrls: ['./register-branch-form.component.css'],
})
export class RegisterBranchFormComponent implements OnInit {
  countries: ICountry[] = [];
  states: IState[] = [];
  selectedCountry?: ICountry;

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
    this.countries = Country.getAllCountries();
  }

  getCities(event: Event): void {
    const selectedCountry: ICountry | undefined = this.countries.find(
      (country) => country.name === (event.target as HTMLSelectElement).value
    );

    if (!selectedCountry) return;

    this.states = State.getStatesOfCountry(selectedCountry.isoCode);
  }

  registerBranch() {
    if (this.branchForm.valid) {
      this.registerBranchUseCase
        .execute(this.branchForm.value as IRegisterBranchRequest)
        .subscribe({
          next: () => {
            console.log('OK');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
