import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  product = {
    id: 1,
    name: 'Brown Jacket',
    price: 180000,
    // Add more product details as necessary
  };

  showDefaultTabs: boolean = true;
  showProductDetailTabs: boolean = false;
  segmentValue: string = 'description';

  currentUrl!: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/tabs/home/product-detail')) {
          this.showDefaultTabs = false;
          this.showProductDetailTabs = true;
        } else {
          this.showDefaultTabs = true;
          this.showProductDetailTabs = false;
        }
      }
    });
  }
  addToWishlist() {
    // Implement your logic to add the product to the wishlist
    console.log('Product added to wishlist');
  }

  addToCart() {
    // Implement your logic to add the product to the cart
    console.log('Product added to cart');
  }

  goToCheckout() {
    this.router.navigate(['/checkout'], { state: { product: this.product } });
  }
}