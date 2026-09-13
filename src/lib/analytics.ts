export type AnalyticsEvent =
  | 'navigation_open'
  | 'global_search_open'
  | 'global_search_navigate'
  | 'theme_change'
  | 'publish_open'
  | 'ai_assistant_open';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

type AnalyticsAdapter = {
  track: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
};

let adapter: AnalyticsAdapter | null = null;

export function registerAnalyticsAdapter(nextAdapter: AnalyticsAdapter) {
  adapter = nextAdapter;
}

export function track(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  if (adapter) {
    adapter.track(event, payload);
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', event, payload ?? {});
  }
}
