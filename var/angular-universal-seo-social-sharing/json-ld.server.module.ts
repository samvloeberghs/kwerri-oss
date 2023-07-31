import { NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { JsonLdService } from './json-ld.service';

export function serializeJsonLdFactory(doc: Document, jsonLdService: JsonLdService) {
  const serializeAndInject = function () {
    const script = doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = jsonLdService.toJson();
    doc.head.appendChild(script);
  };
  return serializeAndInject;
}

@NgModule({
  providers: [
    JsonLdService, {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: serializeJsonLdFactory,
      deps: [DOCUMENT, JsonLdService],
      multi: true,
    },
  ],
})
export class ServerJsonLdModule {}
