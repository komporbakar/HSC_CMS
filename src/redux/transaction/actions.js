import { getData } from '../../utils/fetch';
import { startFetchingTransaction, fetchTransactionSuccess, fetchTransactionFailure } from './slices';

export const fetchOrders = (page, limit, keyword) => async (dispatch) => {
  try {
    dispatch(startFetchingTransaction())

    const response = await getData('/orders/all',{
        pageNumber: page,
        limit: limit,
        keyword: keyword
    });

      
    dispatch(fetchTransactionSuccess(response.data));
  } catch (error) {
    console.error('Error fetching Transactions:', error);
    dispatch(fetchTransactionFailure(error));
  }
};
