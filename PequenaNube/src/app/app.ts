import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { Cart } from './features/cart/cart';
import { WhatsAppBubble } from './shared/ui/whatsapp-bubble';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Cart, WhatsAppBubble],
  templateUrl: './app.html',

})
export class App {}
