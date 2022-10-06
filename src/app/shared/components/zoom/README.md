# Zoom Component

This component is intended to increase, and decrease any image passed as child components.  
It doesn't work alone. It needs the parent component to tell when to perform actions:

* `zoomIn`: Subject that tells when to increase the image
* `zoomOut`: Subject that tells when to decrease the image
* `resetZoom`: Subject that tells when the image should reset its size

## Exemple

```html
<app-zoom
  [zoomIn]="onZoomIn"
  [zoomOut]="onZoomOut"
  [resetZoom]="onResetZoom">
  <img src="image.img" loading="lazy" />
</app-zoom>
```
