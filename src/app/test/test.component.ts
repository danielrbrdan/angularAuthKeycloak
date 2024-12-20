import { Component, OnInit } from '@angular/core';
import { TestService } from './service/test.service';
import { ITest } from './interface/test.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-test',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
  tests?: ITest[];
  formCreate!: FormGroup;
  message?: string;

  constructor(
    private readonly testService: TestService,
    private readonly formBuilder: FormBuilder,
    public readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.setForm();
  }

  findAll() {
    this.testService.findAll().subscribe((response) => {
      this.tests = response;
    });
  }
  private setForm() {
    this.formCreate = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  create() {
    if (this.formCreate.invalid) return;
    const test = this.formCreate.getRawValue() as ITest;

    this.testService
      .create(test)
      .subscribe({
        next: () => {
          this.formCreate.reset();
          this.findAll();
        },
        error: (err) => {
          this.message = 'Usuario não possui permissão';
        },
      });
  }
}
