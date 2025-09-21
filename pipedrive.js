

const sdk = await new AppExtensionsSDK()
  .initialize({ size: { height: 600,
                        width: 800
   } });

const API_URL = 'https://none-sandbox.pipedrive.com/api/v2/deals';
const BEARER_TOKEN = 'v1u:AQIBAHj-LzTNK2yuuuaLqifzhWb9crUNKTpk4FlQ9rjnXqp_6AE-mSRsNEc-qt-JZF1QvUyHAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMGqcEIUgSSD15bcXPAgEQgDtLA6W-OJ_ytVMrWzkVH7tyBFy3C5ZLb1hgRXukifjFKHrPSN0XT5mLYmrNgQAPNro5MhWeqqjIaVI6zA:rGzH8j5QZxjnjOxM3HxbrBtz9M9O9T-Pu9IxOPSWz9Kzq93aBfCBxNMW6CiqFxme5SSB-SFPm2JQXjqSyWIfE91VD0AhVAiGk4C6v_1jeUXqLDfYTd8IGzCk0Q3JlF-ftNbI8VSWiQjeYTnn7t1px8PQtzq_q2HjvAVf2nBSCmSPkFprrigtG4PozdG3xCAq72Ue5pkVP3nQ3A2VTu0AsKzJ_OfPFOMdkePk-iyQvymCO4A93RTD1ezSq2ve8NNCRoAvzknWLXp9ugv0aaACXOJ-wjIPiqs-6A25'; 

document.getElementById('submitButton').addEventListener('click',async function(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
        'firstName', 'lastName', 'phone', 'jobType', 'jobSource',
        'address', 'city', 'zipCode', 'area', 'startDate',
        'startTime', 'endTime', 'testSelect'
    ];
    
    let isValid = true;
    let errorMessage = '';
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            errorMessage += `${field.placeholder || fieldId} is required\n`;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });
    
    const email = document.getElementById('email').value;
    if (email && !isValidEmail(email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address\n';
        document.getElementById('email').style.borderColor = 'red';
    }
    
    const phone = document.getElementById('phone').value;
    if (phone && !isValidPhone(phone)) {
        isValid = false;
        errorMessage += 'Please enter a valid phone number\n';
        document.getElementById('phone').style.borderColor = 'red';
    }
    
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    if (startTime && endTime && startTime >= endTime) {
        isValid = false;
        errorMessage += 'End time must be after start time\n';
        document.getElementById('startTime').style.borderColor = 'red';
        document.getElementById('endTime').style.borderColor = 'red';
    }
    
    const startDate = document.getElementById('startDate').value;
    if (startDate && isPastDate(startDate)) {
        isValid = false;
        errorMessage += 'Start date cannot be in the past\n';
        document.getElementById('startDate').style.borderColor = 'red';
    }
    
    if (!isValid) {

      await sdk.execute(Command.SHOW_SNACKBAR, {
  message: 'Please fix the following errors:\n\n' + errorMessage,
        });
        //alert('Please fix the following errors:\n\n' + errorMessage);
        return;
    }
    

    const formData = {
        title: "Job" + crypto.randomUUID(),
        stage_id: 1,
        status: "open",
        owner_id: 24315226,
        custom_fields: {
            "3a1056d8177b0eb29916a1aca34b7976f50aa5a6": document.getElementById('firstName').value.trim(),
            "f8bb8d9a0b36c0f92ba7b63e909f68394ce50071": document.getElementById('lastName').value.trim(),
            "0351fb3365b04bb7edc723fa4dd6f3fe27f6703e": document.getElementById('phone').value.trim(),
            "413403a4d1140669e402d608caf11af1d1e81b32": document.getElementById('email').value.trim(),
            "e324eed54c352f5037f430de53732ccf6d5f103b": document.getElementById('jobType').value,
            "930ce19caedc48a96fcfe91b9f7a12c6d8321b77": document.getElementById('jobSource').value,
            "855c5c93ef3189fcbef341c2e7315b174f5e53e4": document.getElementById('jobDescription').value.trim(),
            "6a3a4797302fd7069cd034cda74e59ee34f4f007": document.getElementById('area').value,
            "57d3aaff6a002a7cba44d6011d3b7eca88449726": document.getElementById('zipCode').value.trim(),
            "80ab0a84dc8e0a2260663515cb54635ae5415b4b": document.getElementById('state').value.trim(),
            "26ad2909c57bf7079b3a9d06267498abce9ef0e0": document.getElementById('city').value.trim(),
            "07bd2033bbd6334453edff1c249cfe3e82572dca": document.getElementById('address').value.trim(),
            "a3026a0592c3d9496955dbe6223ac482edb2143e": {
                "value": document.getElementById('startTime').value + ":00"
            },
            "69ca129162a41aaf0c2dc8dfff611a3a00fd2fbf": {
                "value": document.getElementById('endTime').value + ":00"
            },
            "a13043b341fd6a6953e6bcd3d76b653ad69a1bcf": document.getElementById('startDate').value,
            "72aef6c1fbe6281fde29528470d2a75166e56bd9": document.getElementById('testSelect').value
        }
    };
    
    createDeal(formData);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isPastDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
}

async function createDeal(dealData) {
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
                if (result.data && result.data.id) {
            const dealId = result.data.id;
            window.location.href = `https://none-sandbox.pipedrive.com/deal/${dealId}`;
        } else {
            alert('Deal created successfully, but could not redirect to the deal page.');
        }

        return result;
        
    } catch (error) {
        console.error('Error creating deal:', error);
        alert('Error creating deal. Please try again.');
        throw error;
    }
}


document.getElementById('testButton').addEventListener('click', function() {
    handleClick();
});