import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any;
  user:UserModel;
  userUpdated: UserModel
  updateUser = {
    username: '',
    name: '',
    surname:'',
    phone: '',
    email: '',
    role: ''
  }
  constructor(
    private userRest: UserRestService
  ) {
    this.user = new UserModel('', '', '', '', '', '', '', '');
    this.userUpdated = new UserModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.userRest.getClients().subscribe({
      next: (res:any)=>this.users = res,
      error: (err)=> console.log(err.error.message)
    })
  }

  getClient(id:string){
    this.userRest.getClient(id).subscribe({
      next: (res:any)=>{
        this.userUpdated = res;
        this.userUpdated.id = res._id;
        this.updateUser.username = this.userUpdated.username;
        this.updateUser.name = this.userUpdated.name;
        this.updateUser.surname = this.userUpdated.surname;
        this.updateUser.phone = this.userUpdated.phone;
        this.updateUser.email = this.userUpdated.email;
        this.updateUser.role = this.userUpdated.role;
        },
      error: (err)=> console.log(err.error.message)
    })
  }
  
  deleteClient(id:string){
    this.userRest.deleteClient(id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 2000
        })
        this.getClients();
      },
      error: (err)=> console.log(err.error.message)
    })
  }

  createAdmin(addUserForm:any){
    this.userRest.createAdmin(this.user).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.getClients()
        addUserForm.reset();
    },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  updateClient(){
    this.userRest.updateClient(this.userUpdated.id,this.updateUser).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getClients();
      },
      error: (err)=> {
      alert(err.error.message)}
    })
  }
}
