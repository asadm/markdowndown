import mixpanel from 'mixpanel-browser';

mixpanel.init('1b44f6c7e06a13b45bb2231bb96e611f', {
  api_host: `https://ws.joinplayroom.com/__mix`
});

export function identify(uuid: any, data: any) {
  mixpanel.identify(uuid);
  mixpanel.people.set(data);
}

export function track(event: any, data: any) {
  try {
    mixpanel.track(event, data);
  } catch (e) {}
}