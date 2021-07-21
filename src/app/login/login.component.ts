import { formatCurrency } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forms: FormGroup = this.form.group({
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })
  constructor(
    private readonly form: FormBuilder,
    private readonly user: UserService
  ) { }

  ngOnInit() {
  }
  async login(){
    if (this.forms.invalid) return;
    const row: {username: string, password:string } = this.forms.getRawValue();
    const body: string = await this.user.login(row.username, row.password) as any;
    localStorage.setItem('token', body);
  }
}
