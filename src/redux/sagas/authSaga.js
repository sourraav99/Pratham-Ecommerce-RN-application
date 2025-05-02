import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_ACTION, SIGNUP_ACTION, VERIFY_EMAIL_ACTION, } from "../action/types";
import axios from "../../utils/axiosConfig";
import { BASE_URL, END_POINTS } from "../../utils/config";



// function* login(payload) {
//     let formData = new FormData()
//     Object.keys(payload).forEach(element => {
//         formData.append(element, payload[element])
//     });
//     // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
//     return yield axios.post(`${BASE_URL}${END_POINTS.LOGIN}`, formData)
// }


// export function* loginSaga(action) {
//     try {
//         // console.log('action--->>>>', action);
//         const response = yield call(login, action.payload);
//         // console.log('response=======>>>>>>>+++++', response.data);
//         action.callBack(response)
//     } catch (error) {
//         console.error('Login failed:', error);
//         action.callBack(error)
//     }
// }

function* login(payload) {
    return yield axios.post(`${BASE_URL}${END_POINTS.LOGIN}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export function* loginSaga(action) {
    try {
        const response = yield call(login, action.payload);
        action.callBack(response);
        //  console.log('response=======>>>>>>>+++++', response.data);
    } catch (error) {
        // console.error('Login failed:', error);
        action.callBack(error);
    }
}


function* signup(payload) {
    // let formData = new FormData()
    // Object.keys(payload).forEach(element => {
    //     formData.append(element, payload[element])
    // });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.SIGNUP}`,payload,{
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export function* signupSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(signup, action.payload);
        console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('signup failed:', error);
        action.callBack(error)
    }
}

// function* forgetPassword(payload) {
//     let formData = new FormData()
//     Object.keys(payload).forEach(element => {
//         formData.append(element, payload[element])
//     });
//     console.log(`${BASE_URL}${END_POINTS.FORGET_PASSWORD}`);
//     return yield axios.post(`${BASE_URL}${END_POINTS.FORGET_PASSWORD}`, formData)
    
    
// }
// export function* forgetPasswordSaga(action) {
//     try {
//         // console.log('action--->>>>', action);
//         const response = yield call(forgetPassword, action.payload);
//         // console.log('response=======>>>>>>>+++++', response.data);
//         action.callBack(response)
//     } catch (error) {
//         console.error('signup failed:', error);
//         action.callBack(error)
//     }
// }


// function* resetPassword(payload) {
//     let formData = new FormData()
//     Object.keys(payload).forEach(element => {
//         formData.append(element, payload[element])
//     });
//     console.log(`${BASE_URL}${END_POINTS.RESET_PASSWORD}`);
//     return yield axios.post(`${BASE_URL}${END_POINTS.RESET_PASSWORD}`, formData)
    
    
// }
// export function* resetPasswordSaga(action) {
//     try {
//         // console.log('action--->>>>', action);
//         const response = yield call(resetPassword, action.payload);
//         // console.log('response=======>>>>>>>+++++', response.data);
//         action.callBack(response)
//     } catch (error) {
//         console.error('signup failed:', error);
//         action.callBack(error)
//     }
// }

function* verifyEmail(payload) {
    // let formData = new FormData()
    // Object.keys(payload).forEach(element => {
    //     formData.append(element, payload[element])
    // });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.VERIFY_EMAIL}`, payload,{
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export function* verifyEmailSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(verifyEmail, action.payload);
        console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('verify Email failed:', error);
        action.callBack(error)
    }
}


export function* authSaga() {
    yield takeLatest(LOGIN_ACTION, loginSaga);
    yield takeLatest(SIGNUP_ACTION, signupSaga);
    yield takeLatest(VERIFY_EMAIL_ACTION, verifyEmailSaga);
        // yield takeLatest(GET_SELF_PROFILE_ACTION, getSelfProfileSaga);
    //     yield takeLatest(GET_ACTIVE_SPORT_ACTION, getActiveSportSaga);
    //     yield takeLatest(EDIT_PROFILE_ACTION, editProfileSaga);
    //     yield takeLatest(GET_SELF_PROFILE_ACTION, getSelfProfileSaga);
    //     yield takeLatest(STEP_1_ACTION, step1Saga);
    //     yield takeLatest(STEP_2_ACTION, step2Saga);
    //     yield takeLatest(STEP_3_ACTION, step3Saga);
    //     yield takeLatest(STEP_4_ACTION, step4Saga);
    // // yield takeLatest(GET_ALL_USERS_ACTION, getAllUsersSaga);


    // yield takeLatest(FETCH_KEYWORD_ACTION, fetchKeywordsSaga);
    // yield takeLatest(GET_USERS_BY_EXPERTISE_AREA, fetchUsersByExpertisSaga);
    // yield takeLatest(FORGET_PASSWORD_ACTION, forgetPasswordSaga);
    // yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
}
export default authSaga;