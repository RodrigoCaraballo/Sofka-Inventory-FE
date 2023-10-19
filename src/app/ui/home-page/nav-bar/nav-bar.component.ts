import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ISale, JWTModel } from 'src/app/domain/domain';
import { SocketApiService } from 'src/app/domain/infrastructure';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  decodeUser?: JWTModel;
  sales: ISale[] = [];

  constructor(private readonly socketService: SocketApiService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    const parsedToken: JWTModel = jwt_decode(token);
    this.decodeUser = parsedToken;
  }
}
