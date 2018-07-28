import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

// Services...
import { DataService } from '../../service/data.service';

// Interface...
import { itemsInterface } from '../../model/product.interface';

//Constants...
import { Constants } from '../../app-constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-productsList',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {
  // Variables to suport sorting in list...
  public searchText: string = "";
  public key: string = "category";
  
  public filter:any = {
    categoriesObj: "",
    products:""
  }

  public productName: Array<string>;
  public categories: Array<any>;
  
  public allItems: Array<any>;
  public reqCat:string = "";
  public reqProd:string = "";
  public askConfirmation:boolean = false;
  private tempItem:itemsInterface = null;

  // For my product page... add form
  public isUpdate: boolean= false;
  public product: itemsInterface;
  public products: Array<any>;
  public showForm: boolean= false;
  public isMyProducts: boolean = false;
  private rSubscription: Subscription;
  private qSubscription: Subscription;
  private sellerInfoRecCopy: Array<any> = [];

  constructor(private dataService: DataService,
      private router: Router,
      private zone: NgZone,
      private route: ActivatedRoute) {
        
        this.categories = Constants.getProductCategoryObj();
        this.productName = Constants.getProductNameObj();
        this.filter.categoriesObj = Constants.getProductCategory();
        
        this.rSubscription = this.router.events.subscribe((e)=>{
          if((e instanceof NavigationEnd) && (e.url.indexOf('/productList') != -1)){
            this.ngOnInit();
            this.qSubscription = this.route.queryParams.subscribe(params=>{
              // Parse list of selected gavysidh and create a page.
                let source = params["source"];
                if(source){
                  this.zone.run(()=>{
                    this.isMyProducts = JSON.parse(source).isMyProducts;
                  });
                }
            });
            this.fetchProducts();
          }
        });
  }

  ngOnInit() {
    //This is for my Products...
    // this.allItems = [{"name":"1_2","category":"1","amount":43.45,"discount":1,"discountFor":"1","unit":"1liter"}];
}
  ngOnDestroy() {
    this.rSubscription.unsubscribe();
    this.qSubscription.unsubscribe();
  }
  fetchProducts(){
    this.dataService.showLoader();

    this.zone.runOutsideAngular(()=>{
      // Flase for my products and true for all products
      if(this.isMyProducts){
        this.dataService.getProducts(false);
      }else{
        this.dataService.getProducts(true);
      }
    });
    this.dataService.getAllProductsObservable().subscribe(data=>{
      if(data){
        this.zone.run(()=>{
          this.allItems = data;
          this.dataService.hideLoader();
        });
      }
    });
    this.dataService.getAllItemsObservable().subscribe(data=>{
      if(data.length === 1){
        this.sellerInfoRecCopy = this.sellerInfoRecCopy.filter((record:any)=>{
          if(record.email === data[0].email){
            this.zone.run(()=>{
              record.seller = data[0];
            });
            return false;
          }else{
            return true;
          }
        });
      }
    });
  }
  contactSeller(email: string, record: any){
    let userProfile = this.dataService.getUserProfile(email);
    if(userProfile){
      record.seller = userProfile;
    }else{
      record.loading = true;
      this.sellerInfoRecCopy.push(record);
    }
  }
  
  delete(item: itemsInterface){
    this.showForm = false;
    this.askConfirmation = true;
    this.tempItem = item;
  }
  onConfirmation(isApproved:boolean){
    if(isApproved){
      this.dataService.deleteProduct(JSON.stringify(this.tempItem));
      this.deleteFromLocal(this.tempItem);
    }
    this.askConfirmation = false;
  }
  deleteFromLocal(item:itemsInterface){
    let myAllItems = this.allItems.slice();

    myAllItems.every((myItem, index)=>{
      if(myItem.name === item.name && myItem.unit === item.unit){
        myAllItems.splice(index, 1);
        return false;
      }
      return true;
    });
    this.allItems = myAllItems;
  }
  edit(item: itemsInterface){
      this.zone.run(()=>{
        this.showForm = true;
        this.isUpdate = true;
        this.product =  Object.assign({}, item);
        // Array of all products under this category
        this.products = Constants.getProductsList()[item.category];
      });
      window.scrollTo(0, 0);
  }
  public onCatChange(cat:string){
    this.zone.run(()=>{
      this.filter.products = Constants.getProductsList()[cat];
      this.reqProd = "";
    });
  }
  public addProduct(){
    this.showForm = !this.showForm;
    this.isUpdate = false;
    this.product = {
         category: '0',
         name: '0',
         amount: null,
         discount: null,
         discountFor: '0',
         unit: ''
    }
  }
  public onUpdateItem(item: itemsInterface){
    this.deleteFromLocal(item);
    this.allItems.unshift(item);
    this.showForm = false;
  }
  public onProductAdd(item: itemsInterface){
    this.allItems.unshift(item);
  }
}
