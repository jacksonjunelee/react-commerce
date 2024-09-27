// actions.js
/* 
    const data = { name: string, eventData: object }
*/
export const trackEvent = (eventName, data) => {
    return async (dispatch) => {
        dispatch({
            type: 'TRACK_EVENT',
            payload: { 
                eventName,
                data,
                timestamp: new Date().toISOString(),
            }
        })
    }
};