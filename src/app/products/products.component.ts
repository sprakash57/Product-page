import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pageTitle:string = "Product list";
  imageWidth:number = 50;
  imageMargin:number = 2;
  showImage:boolean = true;
  filteredProducts: IProduct[];
  _listFilter:string;
  products:IProduct[];
  errorMessage: any;
    
  get listFilter():string{
    return this._listFilter;
  }

  set listFilter(value:string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter?this.performFilter(this.listFilter):this.products;
  }

  performFilter(filteredBy: string): IProduct[]{
    filteredBy = filteredBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct)=>
            product.productName.toLocaleLowerCase().indexOf(filteredBy)!== -1);
  }

  toggleImage():void{
    this.showImage = !this.showImage;
  }

  onRatingClicked(value:string):void{
    this.pageTitle = 'Product list ' + value;
  }
  
  //Only used for instantiation 
  constructor(private _productService:ProductService) {
    
  }

  //For service data manipulation
  ngOnInit() {
    this._productService.getProduts()
                        .subscribe(products => {
                          this.products = products
                          this.filteredProducts = this.products;
                        },
                                   error => this.errorMessage = <any>error);   
                        
    
  }

}
