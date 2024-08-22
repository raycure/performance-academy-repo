// import authService from "../../auth/auth.service/index.js"
import * as actionTypes from './types.js';


export const register =
  ({ registerData }) =>
    {console.log(registerData);}
  
  //   async (dispatch) => {
  //     dispatch({
  //       type: actionTypes.REQUEST_LOADING,
  //     });
  // const data = await authService.register({ registerData });
    // if (data.success === true) {
    //   dispatch({
    //     type: actionTypes.REGISTER_SUCCESS,
    //   });
    // } else {
    //   dispatch({
    //     type: actionTypes.REQUEST_FAILED,
    //   });
    // }