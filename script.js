// Pipedrive API configuration
const PIPEDRIVE_API_TOKEN = '14059cee12e3c7a5e74acbc52b89c93b031a5158'; // Replace with your actual token
const PIPEDRIVE_BASE_URL = 'https://api.pipedrive.com/v1';

// Function to create a deal in Pipedrive
async function createPipedriveDeal(dealData) {
    try {
        const response = await fetch(`${PIPEDRIVE_BASE_URL}/deals?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dealData)
        });

        const result = await response.json();
        
        if (result.success) {
            return { success: true, data: result.data };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Function to create a person in Pipedrive
async function createPipedrivePerson(personData) {
    try {
        const response = await fetch(`${PIPEDRIVE_BASE_URL}/persons?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Function to create an organization in Pipedrive
async function createPipedriveOrganization(orgData) {
    try {
        const response = await fetch(`${PIPEDRIVE_BASE_URL}/organizations?api_token=${PIPEDRIVE_API_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orgData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Main function to save all data to Pipedrive
async function saveToPipedrive() {
    const statusDiv = document.getElementById('status');
    statusDiv.innerHTML = 'Saving to Pipedrive...';
    
    try {
        // Get form data from iframe
        const formData = getFormData();
        
        // Create person first (if contact info provided)
        let personId = null;
        if (formData.person_name || formData.person_email) {
            const personResult = await createPipedrivePerson({
                name: formData.person_name,
                email: formData.person_email,
                phone: formData.phone
            });
            
            if (personResult.success) {
                personId = personResult.data.id;
            }
        }
        
        // Create organization (if provided)
        let orgId = null;
        if (formData.org_name) {
            const orgResult = await createPipedriveOrganization({
                name: formData.org_name
            });
            
            if (orgResult.success) {
                orgId = orgResult.data.id;
            }
        }
        
        // Create deal
        const dealData = {
            title: formData.title || 'New Deal',
            value: formData.value || 0,
            currency: formData.currency,
            person_id: personId,
            org_id: orgId,
            ...formData.custom_fields
        };
        
        const dealResult = await createPipedriveDeal(dealData);
        
        if (dealResult.success) {
            statusDiv.innerHTML = `
                <div style="color: green; padding: 10px; background-color: #f0fff0; border: 1px solid #d4edda; border-radius: 4px;">
                    ? Success! Deal created in Pipedrive with ID: ${dealResult.data.id}
                </div>
            `;
        } else {
            statusDiv.innerHTML = `
                <div style="color: #856404; padding: 10px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
                    ?? Error creating deal: ${dealResult.error}
                </div>
            `;
        }
        
    } catch (error) {
        statusDiv.innerHTML = `
            <div style="color: #721c24; padding: 10px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
                ? Error: ${error.message}
            </div>
        `;
    }
}

// Alternative: If you want to auto-save when iframe form is submitted
function setupIframeCommunication() {
    const iframe = document.getElementById('crmForm');
    
    // Listen for messages from iframe
    window.addEventListener('message', function(event) {
        // Verify origin for security
        if (event.origin !== 'https://your-form-domain.com') return;
        
        if (event.data.type === 'formSubmitted') {
            // Auto-save to Pipedrive when form is submitted in iframe
            saveToPipedrive();
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupIframeCommunication();
});