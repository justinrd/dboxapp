import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.debox.app',
  appName: 'Dbox',
  webDir: 'www',
  plugins: {
    LiveUpdates: {
      enabled: 'true',
      appId: '7bf73cbe',
      channel: 'Production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;
