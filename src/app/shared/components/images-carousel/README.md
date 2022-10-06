#  Images Carousel Component

This component was built with the Product Details Page in mind.  
It receives an `images` input, with the following format:

```typescript
[
  img: String,
  thumbnail: String
]
```

## Example

```html
<app-images-carousel images="[{ img: 'url', thumbnail: 'url' }, { img: 'url', thumbnail: 'url' }]" />
```

Here's a quick array to help you out:

```typescript
  [
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76-1.jpg?ixlib=java-2.3.1&w=480&s=f86dfbfca4bed91de08bf571d33f5ef3',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76-1.jpg?ixlib=java-2.3.1&w=480&s=f86dfbfca4bed91de08bf571d33f5ef3',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76.jpg?ixlib=java-2.3.1&w=480&s=3716f9832e3506a2dc2da17d90580c6d',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76.jpg?ixlib=java-2.3.1&w=480&s=3716f9832e3506a2dc2da17d90580c6d',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76a.jpg?ixlib=java-2.3.1&w=480&s=c60f8b3f1b79be522315bb56a4187036',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76a.jpg?ixlib=java-2.3.1&w=480&s=c60f8b3f1b79be522315bb56a4187036',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76b.jpg?ixlib=java-2.3.1&w=480&s=f27f842750d433cbf67538f7d2c27a8a',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76b.jpg?ixlib=java-2.3.1&w=480&s=f27f842750d433cbf67538f7d2c27a8a',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76b.jpg?ixlib=java-2.3.1&w=480&s=f27f842750d433cbf67538f7d2c27a8a',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76b.jpg?ixlib=java-2.3.1&w=480&s=f27f842750d433cbf67538f7d2c27a8a',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76c.jpg?ixlib=java-2.3.1&w=480&s=7a331623ca339291b17105c2d638fbac',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76c.jpg?ixlib=java-2.3.1&w=480&s=7a331623ca339291b17105c2d638fbac',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76d.jpg?ixlib=java-2.3.1&w=480&s=13ed8f6e7d8525f466bf4864639ad8d3',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76d.jpg?ixlib=java-2.3.1&w=480&s=13ed8f6e7d8525f466bf4864639ad8d3',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76e.jpg?ixlib=java-2.3.1&w=480&s=cf5c7f0a5054ba91a4c8176aeccf8711',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fgajarefashion.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fshs-dsn-as-w-n-76e.jpg?ixlib=java-2.3.1&w=480&s=cf5c7f0a5054ba91a4c8176aeccf8711',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-0.jpeg?ixlib=java-2.3.1&w=480&s=225ea906fc9493ce5e7df84b2452fdf2',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-0.jpeg?ixlib=java-2.3.1&w=150&s=63b6e74db28795f10065be05fe5795a7',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-2.jpeg?ixlib=java-2.3.1&w=480&s=a6b016f5bca7bbe0b2fea8ed94224052',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-2.jpeg?ixlib=java-2.3.1&w=150&s=50d8526c04aa0105095854b9dd9d140b',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-3.jpeg?ixlib=java-2.3.1&w=480&s=3a3d0fbf60fd7a3b66dbc57d0fae9e67',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-3.jpeg?ixlib=java-2.3.1&w=150&s=47e53bfcbcc2da0c5a6040f1feb855d1',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-1.jpeg?ixlib=java-2.3.1&w=480&s=1e9e3c3cb28b86e729e495b3484ccd17',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-1.jpeg?ixlib=java-2.3.1&w=150&s=f21f0861111ed99afc4ccd9097e37dc0',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-5.jpeg?ixlib=java-2.3.1&w=480&s=9f5a6b261b86841d4d5cd2beba97f081',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-5.jpeg?ixlib=java-2.3.1&w=150&s=aa80cb52f72ab41ff473fd74f937d526',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-6.jpeg?ixlib=java-2.3.1&w=480&s=62f08cfaade7263434ec202294e067e9',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-6.jpeg?ixlib=java-2.3.1&w=150&s=210cca54e1292ef046d1c338aad15e4c',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-4.jpeg?ixlib=java-2.3.1&w=480&s=cbbe6bd6e388c88737f00f6ab210de6b',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-4.jpeg?ixlib=java-2.3.1&w=150&s=57c7ce5bf19cbe03bdd4134bd2ac6954',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-7.jpeg?ixlib=java-2.3.1&w=480&s=f404d23ebc1a3ad626bd6eb418e59590',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-7.jpeg?ixlib=java-2.3.1&w=150&s=e59314cf834789d0f699f500094099b7',
    },
    {
      img: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-8.jpeg?ixlib=java-2.3.1&w=480&s=45ab6a26449a4a3600dea9cc58884273',
      thumbnail: 'https://prosell-dev.imgix.net/https%3A%2F%2Fbackoffice.thebrandcollector.com%2Fmedia%2Fimg%2F195159-8.jpeg?ixlib=java-2.3.1&w=150&s=b66dcaf711ca605d2902438d8bcf8a39',
    }
  ]
```
