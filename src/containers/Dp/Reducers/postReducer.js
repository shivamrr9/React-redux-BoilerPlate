
import { Constants } from '../constants';
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.3/node_modules/redux';

const initialState = {
    test:5,
    response:{},
    Postresponse:{},
    visibility:false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Constants.TEST_VALUE:
                return{
                    test: action.flag
                }
        case Constants.API_CALL_TEST:
                return{
                    response: action.response,
                }
        case Constants.POST_API_RESPONSE:
                return{
                    Postresponse: action.data
                }
        case Constants.SHOW_LOADER:
                return{
                    visibility:action.visibility
                }
        case Constants.HIDE_LOADER:
                return{
                    visibility:action.visibility
                }
        default:
            return state;
    }
}
