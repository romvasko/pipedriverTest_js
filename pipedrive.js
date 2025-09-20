import AppExtensionsSDK from '@pipedrive/app-extensions-sdk';

const sdk = await new AppExtensionsSDK()
  .initialize({ size: { height: 600,
                        width: 800
   } });