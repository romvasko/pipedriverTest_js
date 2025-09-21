import AppExtensionsSDK from '@pipedrive/app-extensions-sdk';

const sdk = await new AppExtensionsSDK({ identifier: 'db6f6128-06e7-43fd-a0c3-6e47122e72b9' })
  .initialize({ size: { height: 600,
                        width: 800
   } });


const API_URL = 'https://none-sandbox.pipedrive.com/api/v2/deals';
const BEARER_TOKEN = 'v1u:AQIBAHj-LzTNK2yuuuaLqifzhWb9crUNKTpk4FlQ9rjnXqp_6AE-mSRsNEc-qt-JZF1QvUyHAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMGqcEIUgSSD15bcXPAgEQgDtLA6W-OJ_ytVMrWzkVH7tyBFy3C5ZLb1hgRXukifjFKHrPSN0XT5mLYmrNgQAPNro5MhWeqqjIaVI6zA:WpD3z6VIZxgMmIaqiei45KURH3s0rLCpr8mID4gz8qtJnnAh0RQxffEl63COOxQJjvoOlEcnHOkAmxdCxQwqcu2FrZe4XQLLGRSAyi0hOQl3nEX_Ev_uYwnYVYLlfNsbRsmM4KncXCsORB1IW-QkBC6v5HU2yF6kikl0p37NlZmb3mojv2TYojnHyBnG4-9ozXGI0aGMwdMSBRe-Orw0cCguDsDO5ItUTgepuiYi0uzq5Ii52rPmcwVphk9oLWMMbR3920SOTwZSf_h4jcvv8WzMhkl1Jt-pflSX'; 



const dealData = {
    "title": "I'm here",
    "stage_id": 1,
    "status": "open",
    "owner_id": 24315226,
    "custom_fields": {
        "3a1056d8177b0eb29916a1aca34b7976f50aa5a6": "first name",
        "f8bb8d9a0b36c0f92ba7b63e909f68394ce50071": "last name",
        "0351fb3365b04bb7edc723fa4dd6f3fe27f6703e": "123456798",
        "413403a4d1140669e402d608caf11af1d1e81b32": "email@email.email",
        "e324eed54c352f5037f430de53732ccf6d5f103b": "job type",
        "930ce19caedc48a96fcfe91b9f7a12c6d8321b77": "job source",
        "855c5c93ef3189fcbef341c2e7315b174f5e53e4": "job description",
        "6a3a4797302fd7069cd034cda74e59ee34f4f007": "area",
        "57d3aaff6a002a7cba44d6011d3b7eca88449726": "zip code",
        "80ab0a84dc8e0a2260663515cb54635ae5415b4b": "state",
        "26ad2909c57bf7079b3a9d06267498abce9ef0e0": "city",
        "07bd2033bbd6334453edff1c249cfe3e82572dca": "address",
        "a3026a0592c3d9496955dbe6223ac482edb2143e": {
            "value": "09:00:00"
        },
        "69ca129162a41aaf0c2dc8dfff611a3a00fd2fbf": {
            "value": "18:00:00"
        },
        "a13043b341fd6a6953e6bcd3d76b653ad69a1bcf": "2025-12-31",
        "72aef6c1fbe6281fde29528470d2a75166e56bd9": "test select"
    }
};

// Function to create a deal
async function createDeal() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dealData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Deal created successfully:', result);
        return result;
        
    } catch (error) {
        console.error('Error creating deal:', error);
        throw error;
    }
}

document.getElementById('submitButton').addEventListener('click', function() {
    createDeal();
});