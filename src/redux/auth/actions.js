// import authService from "../../auth/auth.service/index.js"
import * as actionTypes from './types.js';

//actionda onemli varlar degisti 
//authservice te backende yollandi basari basarisizlik uzerine toaster calistirildi 

export  const register =
({ registerData }) =>
async (dispatch) => {
  dispatch({
    type: actionTypes.REQUEST_LOADING,
  });
  
  const data = await authService.register({ registerData });

};
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