import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  studentArr: any[]=[];
  student: any = {
    studentId:0,
    fullName: '',
    email: '',
  }
  isSelectAll: boolean = false;
  constructor() { }

  ngOnInit(): void {
    const localData = localStorage.getItem('Emp');
    if(localData != null){
      this.studentArr = JSON.parse(localData);
    }
  }
  onCheckAll(){
    for( let i =0; i < this.studentArr.length; i++){
     this.studentArr[i].isChecked = this.isSelectAll;
    }
  }
  onAddStudent(){
    const notNull = document.getElementById('studentModel');
    if(notNull !=null){
      notNull.style.display = 'block';
    }
    this.student= {
      studentId: 0,
      fullName: '',
      email: ''
    }
  }

  onCloseModel(){
    const notNull = document.getElementById('studentModel');
    if(notNull !=null){
      notNull.style.display = 'none';
    }
  }
  onDelete(id:number){
    for(let i =0; i < this.studentArr.length; i++){
      if(this.studentArr[i].studentId==id){
        this.studentArr.splice(i,1);
      }
      localStorage.setItem('Emp',JSON.stringify(this.studentArr));
    }
  }
  onEdit(stud:any){
    this.onAddStudent();
    this.student = stud;
    
  }
  saveStudent(data:any){
    this.student.studentId = this.studentArr.length +1;
  this.studentArr.push(this.student);
  this.onCloseModel();
  localStorage.setItem('Emp',JSON.stringify(this.studentArr));
  this.student= {
    studentId: 0,
    fullName: '',
    email: ''
  }
  }
  onUpdate(){
    const record = this.studentArr.find(m=> m.studentId == this.student.studentId);
    record.fullName = this.student.fullName;
    localStorage.setItem('Emp',JSON.stringify(this.studentArr));
    this.onCloseModel();
  }
  deleteAll(){
      this.studentArr = this.studentArr.filter(student => !student.isChecked);
      localStorage.setItem('Emp', JSON.stringify(this.studentArr));
  }
 
}
