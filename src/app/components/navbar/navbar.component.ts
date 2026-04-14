import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/firebase/auth.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
