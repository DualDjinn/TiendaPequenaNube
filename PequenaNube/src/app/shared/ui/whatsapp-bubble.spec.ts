import { TestBed } from '@angular/core/testing';
import { WhatsAppBubble } from './whatsapp-bubble';

describe('WhatsAppBubble', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ providers: [WhatsAppBubble] });
    const comp = TestBed.inject(WhatsAppBubble);
    expect(comp).toBeTruthy();
  });
});
