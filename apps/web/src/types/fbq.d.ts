// Modified from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/facebook-pixel/index.d.ts

 
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare var fbq: facebook.Pixel.Event;

type ParamContentCategory = string;
type ParamContentIDs = ReadonlyArray<number | string>;
type ParamContentName = string;
type ParamContentType = 'product_group' | 'product';
type ParamContents = ReadonlyArray<Readonly<{ id: string; quantity: number }>>;
type ParamCurrency = string;
type ParamDeliveryCategory = 'curbside' | 'home_delivery' | 'in_store';
type ParamNumItems = number;
type ParamPredictedLtv = number;
type ParamSearchString = string;
type ParamStatus = boolean;
type ParamValue = number;

declare namespace facebook.Pixel {
   
  interface Event {
    (eventType: 'init', initialAppId: string): void;
    (
      eventType: 'track',
      eventName: 'AddPaymentInfo',
      parameters?: {
        content_category?: ParamContentCategory;
        content_ids?: ParamContentIDs;
        currency?: ParamCurrency;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'AddToCart',
      parameters?: {
        content_ids?: ParamContentIDs;
        content_name?: ParamContentName;
        content_type?: ParamContentType;
        contents?: ParamContents;
        currency?: ParamCurrency;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'AddToWishlist',
      parameters?: {
        content_category?: ParamContentCategory;
        content_ids?: ParamContentIDs;
        content_name?: ParamContentName;
        contents?: ParamContents;
        currency?: ParamCurrency;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'CompleteRegistration',
      parameters?: {
        content_name?: ParamContentName;
        currency?: ParamCurrency;
        status?: ParamStatus;
        value?: ParamValue;
      },
    ): void;
    (eventType: 'track', eventName: 'Contact'): void;
    (eventType: 'track', eventName: 'CustomizeProduct'): void;
    (eventType: 'track', eventName: 'Donate'): void;
    (eventType: 'track', eventName: 'FindLocation'): void;
    (
      eventType: 'track',
      eventName: 'InitiateCheckout',
      parameters?: {
        content_category?: ParamContentCategory;
        content_ids?: ParamContentIDs;
        content_name?: ParamContentName;
        currency?: ParamCurrency;
        num_items?: ParamNumItems;
        value?: ParamValue;
      },
    ): void;
    (eventType: 'track', eventName: 'PageView'): void;
    (
      eventType: 'track',
      eventName: 'Lead',
      parameters?: {
        content_category?: ParamContentCategory;
        content_name?: ParamContentName;
        currency?: ParamCurrency;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'Purchase',
      parameters?: {
        content_ids?: ParamContentIDs;
        content_name?: ParamContentName;
        content_type?: ParamContentType;
        contents?: ParamContents;
        currency: ParamCurrency;
        num_items?: ParamNumItems;
        order_id?: string | undefined;
        value: ParamValue;
      },
    ): void;
    (eventType: 'track', eventName: 'Schedule'): void;
    (
      eventType: 'track',
      eventName: 'Search',
      parameters?: {
        content_category?: ParamContentCategory;
        content_ids?: ParamContentIDs;
        content_type?: ParamContentType;
        contents?: ParamContents;
        currency?: ParamCurrency;
        search_string?: ParamSearchString;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'StartTrial',
      parameters?: {
        currency?: ParamCurrency;
        predicted_ltv?: ParamPredictedLtv;
        value?: ParamValue;
      },
    ): void;
    (eventType: 'track', eventName: 'SubmitApplication'): void;
    (
      eventType: 'track',
      eventName: 'Subscribe',
      parameters?: {
        currency?: ParamCurrency;
        predicted_ltv?: ParamPredictedLtv;
        value?: ParamValue;
      },
    ): void;
    (
      eventType: 'track',
      eventName: 'ViewContent',
      parameters?: {
        content_category?: ParamContentCategory;
        content_ids?: ParamContentIDs;
        content_name?: ParamContentName;
        content_type?: ParamContentType;
        contents?: ParamContents;
        currency?: ParamCurrency;
        value?: ParamValue;
      },
    ): void;
  }
}
