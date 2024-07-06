import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss'],
})
export class ShareModalComponent {
  @Input() productId!: number;

  constructor(
    private modalController: ModalController,
    private navController: NavController
  ) {}

  async share(platform: string) {
    // Close the modal
    await this.modalController.dismiss();

    const url = `https://swiftyleshop.com/product-detail/${this.productId}`; // Replace with your actual URL
    const text = `Check out this product!`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':
        // Instagram sharing is more complex and typically requires the app's API or user intervention.
        // For simplicity, we'll just show a message.
        alert('Sharing on Instagram is not directly supported. Please use the Instagram app.');
        break;
      default:
        console.error('Unknown platform: ', platform);
    }
  }
}
