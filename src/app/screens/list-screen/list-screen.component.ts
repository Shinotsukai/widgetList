import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss']
})
export class ListScreenComponent implements OnInit {

  constructor(private apiService:ApiService) { 

  }

  orders:any[]=[];
  orderCount = 0;
  orderQty:number=0;

  destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {
    this.resetList()
  }

  resetList(){
 this.apiService.resetOrders(true).pipe(takeUntil(this.destroy$)).subscribe(data =>{
  this.orders =[]
});
  }

  onSubmit(){
    if(this.orderQty > 0){
      this.apiService.newOrder(this.orderQty).pipe(takeUntil(this.destroy$)).subscribe(data =>{
        this.orderCount =this.orderCount + 1;
      })
  
      this.getAllOrders();
    }

  }

  getAllOrders(){
    this.apiService.getWidgetOrders().pipe(takeUntil(this.destroy$)).subscribe((orders:any)=>{
      this.orders = orders;
    });
  }

}
