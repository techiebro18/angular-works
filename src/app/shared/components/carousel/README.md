# Carousel Component

This component expects to receive children components.

It is built upon CSS Snap and Scroll API, giving a smooth transitions with high efficiency.
* Supports dark theme

## Adding general content

You can add several li elements to the component, with anything inside it.  
All elements should be wrapped by a element with `class="slides"`.  

> This component automatically center the elements on screen. If you want a different behaviour, add your content inside a div with 100% width

To test it, copy the snippet below to `app.component.html` to render it on any page:

```html
<app-carousel>
  <ng-container class="slides">
    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quas ipsam quo rem tenetur non nihil inventore iure? Quas, ipsa?
    </li>

    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vero accusantium harum autem. Iusto vitae fugit iure eaque a id?
    </li>

    <li>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem et architecto iste vel beatae atque provident accusantium sunt aliquam reprehenderit.
    </li>
  </ng-container>
</app-carousel>
```

## Using thumbnails

On Desktop devices, is possible to show thumbnails.  
To enable it, you'll need two things:

* Pass `thumbnails="true"` to Carousel component
* You'll need to pass a `ng-container` component with `thumbnails` class, containing `<li>` tags to work (see the example below)

> Pay attention to style the content you want to show in the thumbnail

The snippet below can help you to get it running:

```html
<app-carousel thumbnails="true">
  <ng-container class="slides">
    <li>
      <div>
        <img src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76-1.jpg?ixlib=java-2.3.1&w=480&s=f86dfbfca4bed91de08bf571d33f5ef3" />
      </div>
    </li>
    <li>
      <div>
        <img src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76.jpg?ixlib=java-2.3.1&w=480&s=3716f9832e3506a2dc2da17d90580c6d" />
      </div>
    </li>
    <li>
      <div>
        <img src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76a.jpg?ixlib=java-2.3.1&w=480&s=c60f8b3f1b79be522315bb56a4187036" />
      </div>
    </li>
  </ng-container>

  <ng-container class="thumbnails">
    <li>
      <img
        src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76-1.jpg?ixlib=java-2.3.1&w=480&s=f86dfbfca4bed91de08bf571d33f5ef3"
        style="width: 100%"
        />
    </li>
    <li>
      <img
        src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76.jpg?ixlib=java-2.3.1&w=480&s=3716f9832e3506a2dc2da17d90580c6d"
        style="width: 100%" />
    </li>
    <li>
      <img
        src="https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76a.jpg?ixlib=java-2.3.1&w=480&s=c60f8b3f1b79be522315bb56a4187036"
        style="width: 100%" />
    </li>
  </ng-container>
</app-carousel>
```
