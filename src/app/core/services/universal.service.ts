import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { parseServerRequest } from 'angular-instantsearch';

@Injectable({
  providedIn: 'root',
})
export class UniversalService {
  // A boolean variable to indicate if the currect rendering is on Browser or Server side
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private injector: Injector) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * http://localhost:4200
   */
  public getApplicationUrl(forceHttps?: boolean): string {
    let url = '';

    if (!this.isBrowser) {
      const request = this.injector.get(REQUEST);
      // url = request.protocol + '://' + request.get('host');
      // console.log("headers: ", request.headers.referer);// full url : http://se.localhost:4201/sellers/login, noth always there
      // console.log("headers: ", request.headers['x-forwarded-host']);// host : se.localhost:4201
      // console.log("headers: ", request.headers['x-forwarded-port']);// port : 4201
      // console.log("headers: ", request.headers);
      let host = Array.isArray(request.headers['x-forwarded-host'])
        ? request.headers['x-forwarded-host'][0]
        : request.headers['x-forwarded-host'];

      if (!host) {
        host = request.get('host') || request.headers['host'];
      }

      url = request.headers.referer || request.protocol + '://' + host;
    }
    else {
      const location = window.location;

      // console.log("Location");
      // console.log(location);
      url = location.protocol + '//' + location.host;
    }

    if (forceHttps) {
      url = url.includes('http:')
        ? url.replace('http:', 'https:')
        : url;
    }

    return url;
  }

  /**
   * localhost:4200
   */
  public getApplicationHost(): string {
    let host = '';

    if (!this.isBrowser) {
      const request = this.injector.get(REQUEST);

      // host = request.get('host');
      host = Array.isArray(request.headers['x-forwarded-host'])
        ? request.headers['x-forwarded-host'][0]
        : request.headers['x-forwarded-host'];

      if (!host) {
        host = request.get('host') || request.headers['host'];
      }
    }
    else {
      const location = window.location;

      host = location.host;
    }

    return host;
  }

  /**
   * localhost
   */
  public getApplicationHostname(): string {
    let hostname = '';

    if (!this.isBrowser) {
      const request = this.injector.get(REQUEST);
      let host = Array.isArray(request.headers['x-forwarded-host'])
        ? request.headers['x-forwarded-host'][0]
        : request.headers['x-forwarded-host'];

      if (!host) {
        host = request.get('host') || request.headers['host'];
      }

      const port = Array.isArray(request.headers['x-forwarded-port'])
        ? request.headers['x-forwarded-port'][0]
        : request.headers['x-forwarded-port'];

      // hostname = request.hostname;
      hostname = host.slice(0, -1 * (port.length + 1));
    }
    else {
      const location = window.location;

      hostname = location.hostname;
    }

    return hostname;
  }

  /**
   * http:// | https://
   */
  public getApplicationProtocol() {
    let protocol = '';

    if (!this.isBrowser) {
      const request = this.injector.get(REQUEST);

      protocol = request.protocol + '://';
    }
    else {
      const location = window.location;

      protocol = location.protocol + '//';
    }

    return protocol;
  }

  /**
   *  withoutSearchQuery:  /designer/bottega-veneta/bags
   *  withSearchQuery:     /designer/bottega-veneta/bags?color=red
   */
  public getApplicationPathname(isWithSearchQuery = false): string {
    let pathName = '';

    if (!this.isBrowser) {
      const request = this.injector.get(REQUEST);

      // console.log("request");
      // console.log(request.url); //   /designer/bottega-veneta/bags?color=red
      // console.log(request.originalUrl);//  /designer/bottega-veneta/bags?color=red
      // console.log(request.params);//{ '0': '/designer/bottega-veneta/bags' }
      // console.log(request.query);//{ color: 'red' }
      // console.log(request.path);//  /designer/bottega-veneta/bags
      pathName = request.path;

      if (isWithSearchQuery) {
        pathName = request.url;
      }
    }
    else {
      const location = window.location;

      pathName = location.pathname;

      if (isWithSearchQuery) {
        pathName += location.search;
      }
    }

    return pathName;
  }
}
