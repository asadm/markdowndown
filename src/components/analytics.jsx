import mixpanel from 'mixpanel-browser';

mixpanel.init('1b44f6c7e06a13b45bb2231bb96e611f', {
  api_host: `https://ws.joinplayroom.com/__mix`
});

export function identify(uuid, data) {
  mixpanel.identify(uuid);
  mixpanel.people.set(data);
}

export function track(event, data) {
  try {
    mixpanel.track(event, data);
  } catch (e) {}
}