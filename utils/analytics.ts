// utils/analytics.ts
export const sendGAEvent = (
    eventName: string,
    eventAction: string,
    eventParams: { [key: string]: any }
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_action: eventAction,
        ...eventParams,
      });
    }
  };