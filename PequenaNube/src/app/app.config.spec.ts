import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

describe('appConfig IMAGE_LOADER', () => {
  const loader = (config: ImageLoaderConfig) => {
    const src = config.src;
    const w = config.width || 600;
    if (src.startsWith('images/') || !src.startsWith('http')) return src;
    const uploadMarker = 'res.cloudinary.com/pjhkswfc/image/upload/';
    if (src.includes(uploadMarker)) {
      const parts = src.split(uploadMarker);
      return parts[0] + uploadMarker + `w_${w},c_fit,f_auto,q_auto/` + parts[1];
    }
    return `https://res.cloudinary.com/pjhkswfc/image/fetch/w_${w},c_fit,f_auto,q_auto/${encodeURIComponent(src)}`;
  };

  it('should return local image as-is', () => {
    expect(loader({ src: 'images/logo.png', width: 100 })).toBe('images/logo.png');
  });

  it('should inject transformations in cloudinary upload URL', () => {
    const result = loader({ src: 'https://res.cloudinary.com/pjhkswfc/image/upload/v1/test.jpg', width: 300 });
    expect(result).toContain('w_300,c_fit,f_auto,q_auto');
  });

  it('should proxy external URL through cloudinary fetch', () => {
    const result = loader({ src: 'https://placehold.co/600x600', width: 200 });
    expect(result).toContain('image/fetch/w_200');
    expect(result).toContain('placehold.co');
  });
});
