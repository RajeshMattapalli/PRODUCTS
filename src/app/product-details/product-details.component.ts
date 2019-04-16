import { Component, OnInit, Inject, Output, EventEmitter, inject, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import { Products } from '../models/products';
import { ProductService } from '../../app/product-details/product.service';
import cleanTheData from '../cleanTheData';
import { productsList } from '../mock-products';
import { AlertsService } from '../alerts/alerts.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products;
  productId: number;
  productName: string;
  productModel: string;
  productRating: number;


  // displayedColumns: string[] = ['productImage', 'productId', 'productName', 'productModel', 'productRating', 'action'];
  displayedColumns: string[] = ['productId', 'productName', 'productModel', 'productRating', 'action'];
  dataSource = new MatTableDataSource();
  isLoadingResults: boolean = false;
  editCache = {};

  constructor(private router: Router, private ProductService: ProductService, public dialog: MatDialog, private alertService: AlertsService) { }

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.isLoadingResults = true;
    this.ProductService.getProducts().subscribe(products => {
      this.products = cleanTheData(products);
      this.products = this.updateEditCache(products);
      this.dataSource.data = products;
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  getProductById(products): void {
    this.isLoadingResults = true;
    this.ProductService.getProductById(products).subscribe();
  }

  deleteProduct(products): void {
    this.isLoadingResults = true;
    this.ProductService.deleteProduct(products).subscribe(success => {
      this.alertService.clear();
      this.alertService.success("Product Deleted Successfully");
      this.getProductDetails();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  updateProductDetails(products): void {
    this.isLoadingResults = true;
    this.editCache[products.key].edit = false;
    // delete products.key;
    this.ProductService.updateProduct(products).subscribe(success => {
      this.alertService.clear();
      this.alertService.success("Product Updated Successfully");
      this.getProductDetails();
      this.isLoadingResults = false;
    }, (err) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductsDialog, {
      width: '400px',
      data: { productId: this.productId, productName: this.productName, productModel: this.productModel, productRating: this.productRating }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '') {
        this.saveProduct(result);
      }
      console.log('The dialog was closed');
    });
  }


  logOut(): void {
    this.router.navigate(["login"]);
    localStorage.removeItem('access_token');
  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }

  updateEditCache(products): void {
    this.products.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          products: item
        };
      }
      console.log(this.editCache);
    });
  }

  saveProduct(addProduct: Products): void {
    this.ProductService.saveProduct(addProduct).subscribe((response: any) => {
      if (response.message = "Product Saved Succesfully") {
        this.alertService.clear();
        this.alertService.success("Product Saved Successfully");
        this.getProductDetails();
      }
    });
  }

  openDeleteDialog(products): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      data: products
    });
    dialogRef.afterClosed().subscribe(result => {
      this.deleteProduct(result);
      console.log("Dialog got Closed");
      console.log(result);
    });
  }
}


@Component({
  selector: 'products-dialog',
  templateUrl: 'products-dialog.html'
})
export class ProductsDialog {

  @Output()
  addProduct: EventEmitter<object> = new EventEmitter<object>();

  constructor(public dialogRef: MatDialogRef<ProductsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Products) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendData(data) {
    this.addProduct.emit(data);
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html'
})

export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Products) { }

  testdata = {};

  @Output()
  deleteData: EventEmitter<Object> = new EventEmitter<Object>();

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendData() {
    this.testdata = this.data;
    this.deleteData.emit(this.testdata);
  }
}
