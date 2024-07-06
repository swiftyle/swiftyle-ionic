import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  userName: string = '';
  newMessage: string = '';
  headerName: string = '';
  headerRole: string = 'Customer Care Service';
  headerAvatar: string = '';
  messages = [
    { type: 'from-user2', text: 'Hello, Haejoon! How can I help you today?', time: '9:55 AM' },
    { type: 'issue', text: 'Order Issues' },
    { type: 'sub-issue', text: "I didn't receive my parcel" },
    { 
      type: 'status', 
      orderInfo: {
        image: 'assets/images/products/brown-jacket.png',
        id: 'Order #92287157',
        items: '3 items',
        delivery: 'Standard Delivery',
        status: 'Shipped'
      }
    },
    { 
      type: 'from-user2', 
      text: "Hello, Haejoon! I'm Maggy, your personal assistant from Customer Care Service. Let me go through your order and check its current status. Wait a moment please.",
      time: '10:00 AM'
    },
    { type: 'from-user1', text: 'Hello, Maggy! Sure!', time: '10:05 AM' },
    { 
      type: 'from-user2', 
      text: "Thank you for waiting Amanda! I just checked your order status and it seems like there was a problem on our end. We are really sorry about that. You will receive your parcel within 2 days.",
      time: '10:10 AM'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('name') ?? 'Amanda';
    this.headerName = this.userName; // Set headerName to userName
    this.headerAvatar = this.route.snapshot.paramMap.get('avatar') ?? ''; // Set headerAvatar
    // Load the messages for the user from a service or static data
    this.loadMessages();
  }

  loadMessages() {
    // This method would ideally load messages from a service
    // For now, it can just filter the existing messages array or fetch from an API
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        type: 'from-user1',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      this.newMessage = '';
    }
  }

  getMessageClass(message: any) {
    return {
      'message': true,
      'issue': message.type === 'issue',
      'sub-issue': message.type === 'sub-issue',
      'status': message.type === 'status',
      'from-user2': message.type === 'from-user2',
      'from-user1': message.type === 'from-user1',
    };
  }
}
