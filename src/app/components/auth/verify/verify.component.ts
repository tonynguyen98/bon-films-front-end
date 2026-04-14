import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/firebase/auth.service';

@Component({
  standalone: false,
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
