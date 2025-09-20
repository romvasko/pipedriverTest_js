import AppExtensionsSDK from '@pipedrive/app-extensions-sdk';

const sdk = await new AppExtensionsSDK()
  .initialize({ size: { height: 1000,
                        width: 1000
   } });