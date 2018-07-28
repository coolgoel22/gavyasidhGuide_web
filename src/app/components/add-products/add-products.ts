import { Component, OnInit, ViewChild, NgZone, Input, Output, EventEmitter } from '@angular/core';

//Constants...
import { Constants } from '../../app-constants';

// Services...
import { DataService } from '../../service/data.service';

// Interface...
import { itemsInterface } from '../../model/product.interface';

@Component({
  selector: 'app-addProducts',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.less']
})
export class AddProductsComponent implements OnInit {
  @Output() onUpdateItem: EventEmitter<itemsInterface> = new EventEmitter();
  @Output() productAdded: EventEmitter<itemsInterface> = new EventEmitter();
  @Input() isUpdate: boolean;
  @Input() products: Array<any>;
  @Input() item: itemsInterface = {
    name:'0',
    category: '0',
    amount: null,
    unit: '',
    discountFor: '0'
  };

  public categories: any;
  @ViewChild('myProduct') productForm:any;

  constructor(private data: DataService,
            private zone: NgZone) { }

  ngOnInit() {
    this.categories = Constants.getProductCategory();
    if(!this.isUpdate){
      this.products = [];
      this.resetItem();
    }
  }
  
  resetItem(){
    this.zone.run(()=>{
       this.item = {
        name:'0',
        category: '0',
        amount: null,
        discount: null,
        discountFor: '0',
        unit: ''
      };
    });
  }
  onCatChange(cat:string){
    if(!this.isUpdate){
      this.zone.run(()=>{
        this.products = Constants.getProductsList()[cat];
        console.log("Hello");
        this.item.name = '0';
      });
    }
  }
  
  onSubmit(event, {value, valid}: {value:any, valid:boolean }){
    
    if(value.category == 0){
      this.productForm.form.controls.category.setErrors("not valid");
    }else if(value.name == 0){
      this.productForm.form.controls.name.setErrors("not valid");
    }else{
      // reset form
      this.zone.run(()=>{
        this.productForm.reset();
        this.resetItem();
      });

      this.zone.runOutsideAngular(()=>{
        this.data.saveProduct(JSON.stringify(value));
        if(this.isUpdate){
          this.onUpdateItem.emit(value);
        }else{
          this.productAdded.emit(value);
        }
      });
    }
  }
}