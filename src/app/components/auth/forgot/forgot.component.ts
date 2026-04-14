import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/firebase/auth.service';

@Component({
  standalone: false,
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  forgotForm: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) {
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit(): void {
    this.authService.ForgotPassword(this.forgotForm.get('email').value);
  }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
