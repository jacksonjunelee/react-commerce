// utils/eventLogger.js
export const trackEvent = (event_name, options) => {
    // Log to console (for testing)
    console.log(`Button clicked: ${event_name}`);

    


  
    // Optional: Send to backend (uncomment to use)
    /*
    fetch('https://your-backend.com/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'button_click',
        buttonName: buttonName,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Event logged:', data))
      .catch((error) => console.error('Error logging event:', error));
    */
  };
  