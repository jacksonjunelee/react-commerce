// Action creator for recording a sale
export const recordSale = (saleData) => {
    return {
      type: 'RECORD_SALE',
      payload: saleData,
    };
  };