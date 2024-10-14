// actions/adActions.js

export const saveAd = (ad) => {
  return {
    type: "SAVE_AD",
    payload: ad,
  };
};
