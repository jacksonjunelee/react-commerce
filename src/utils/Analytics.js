import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { trackEvent as trackEventAction } from "../state/actions/analyticsActions";

const Analytics = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Function to track the page load
  const trackPageLoad = (url, data) => {
    const eventUrl = window.location.pathname;
    const eventData = {
      url: eventUrl,
      //   page: "products",
    };
    dispatch(trackEventAction("page_load", eventData));
  };

  // Simple debounce function
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Debounced version of trackPageLoad
  const debouncedTrackPageLoad = debounce(trackPageLoad, 300); // 300ms delay

  // Track initial page load
  //   useEffect(() => {
  //     trackPageLoad(window.location.pathname, data); // or location.pathname
  //   }, []); // Empty dependency array ensures this runs only on page load

  // Track URL changes with debounce
  useEffect(() => {
    debouncedTrackPageLoad(location.pathname, data); // Triggers when the URL changes

    // Clean up the timeout if the component unmounts or location changes
    return () => {
      clearTimeout(debouncedTrackPageLoad);
    };
  }, [location]); // Effect dependency array ensures this runs on URL change

  return null; // This is a utility component, so no need to render anything
};

export default Analytics;
