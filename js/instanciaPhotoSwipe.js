import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';
import PhotoSwipeDynamicCaption from './photoswipe-dynamic-caption-plugin.esm.js';

const smallScreenPadding = {
    top: 0, bottom: 0, left: 0, right: 0
};

const largeScreenPadding = {
    top: 30, bottom: 30, left: 0, right: 0
};

const lightbox = new PhotoSwipeLightbox({
    gallerySelector: '#gallery',
    childSelector: '.pswp-gallery__item',
    // optionaly adjust viewport
    paddingFn: (viewportSize) => {
        return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
    },
    pswpModule: () => import('https://unpkg.com/photoswipe@beta/dist/photoswipe.esm.js')
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
    mobileLayoutBreakpoint: 700,
    type: 'auto',
    mobileCaptionOverlapRatio: 1
});

lightbox.init();