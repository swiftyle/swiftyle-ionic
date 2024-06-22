import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any = null;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.apiService.getProductById(productId);
    }
  }
}
