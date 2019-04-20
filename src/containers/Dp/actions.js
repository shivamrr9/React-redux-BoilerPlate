import { Constants } from './constants';
import {doHttpGet, doHttpPost} from '../../components/utilities.js';

export function Test(flag){
    return (dispatch) => {
        dispatch({
            type : Constants.TEST_VALUE,
            flag
        });
    }
}

//get call example
export function ApiCall(){
    var url1 =`https://api.github.com/users/shivamrr9`;
    return (dispatch) => {
        var promise = doHttpGet(url1,{});
        promise.then((response)=> {
          if(response && response.status === 200){     
            dispatch({
             type: Constants.API_CALL_TEST,
             response
           });
          }          
        }, (err) => {
         console.log("error:",err);
       })
      }
}

export function postApiCall(){
    return (dispatch) => {
        var objToSend ={
            "name":"test5",
            "salary":"123",
            "age":"23"
           }
           var url = `http://dummy.restapiexample.com/api/v1/create`;
           dispatch({
            type: Constants.SHOW_LOADER,
            visibility: true
        });
           var promise = doHttpPost(url, objToSend);
           promise.then((response) => {
             dispatch({
               type: Constants.POST_API_RESPONSE,
               data: response
             });
             //setTimeout(() => window.location.reload(), 1000);
             dispatch({
                type: Constants.HIDE_LOADER,
                visibility: false
            });
           }, (err) => {
            console.log("error in post call :",err);
            dispatch({
                type: Constants.HIDE_LOADER,
                visibility: false
            });
           })
    }
}

