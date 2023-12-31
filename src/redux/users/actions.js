import { getData } from '../../utils/fetch';
import {fetchUsersFailure, fetchUsersSuccess, startFetchingUsers } from './slices';

export const fetchUsers = (page, limit, keyword) => async (dispatch) => {
  try {
    dispatch(startFetchingUsers())

    const response = await getData('/admin', {
      pageNumber: page,
      limit: limit,
      keyword: keyword
  }); 
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(fetchUsersFailure(error));
  }
};
