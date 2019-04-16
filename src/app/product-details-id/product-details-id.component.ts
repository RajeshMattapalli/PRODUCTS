import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Products } from '../models/products';
import { ProductService } from '../../app/product-details/product.service';

@Component({
  selector: 'app-product-details-id',
  templateUrl: './product-details-id.component.html',
  styleUrls: ['./product-details-id.component.css']
})
export class ProductDetailsIdComponent implements OnInit {

  @Input() product: Products;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router, private location: Location) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById(): void {
    const id = +this.route.snapshot.paramMap.get('productId');
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  back(): void {
    // this.router.navigate(['products']);
    this.location.back();
  }

}
