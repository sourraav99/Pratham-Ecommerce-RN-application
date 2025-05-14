import { call, put, takeLatest } from "redux-saga/effects";
import { EDIT_PROFILE, GET_BANNER_PRODUCTS, GET_BANNERS_ACTION, GET_CATEGORIES_ACTION, GET_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_SEARCH, LOGIN_ACTION, REQUEST_FORGET_PASSWORD_ACTION, RESET_PASSWORD_ACTION, SET_CATEGORIES, SIGNUP_ACTION, VERIFY_EMAIL_ACTION, VERIFY_FORGET_PASSWORD_OTP_ACTION, } from "../action/types";
import axios from "../../utils/axiosConfig";
import { BASE_URL, END_POINTS } from "../../utils/config";



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
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.SIGNUP}`, payload, {
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


function* resetPassword(payload) {
    return yield axios.post(`${BASE_URL}${END_POINTS.RESET_PASSWORD}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    })


}
export function* resetPasswordSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(resetPassword, action.payload);
        console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('password change failed:', error);
        action.callBack(error)
    }
}

function* verifyEmail(payload) {
    return yield axios.post(`${BASE_URL}${END_POINTS.VERIFY_EMAIL}`, payload, {
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


function* forgotPasswordRequest(payload) {
    return yield axios.post(`${BASE_URL}${END_POINTS.REQUEST_FORGET_PASSWORD}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export function* forgotPasswordRequestSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(forgotPasswordRequest, action.payload);
        console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('forget password request api failed:', error);
        action.callBack(error)
    }
}

function* verifyForgotPasswordOtp(payload) {
    return yield axios.post(`${BASE_URL}${END_POINTS.VERIFY_FORGET_PASSWORD_OTP}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
export function* verifyForgotPasswordOtpSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(verifyForgotPasswordOtp, action.payload);
        console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('forget password OTP verification api failed:', error);
        action.callBack(error)
    }
}

function* getBanners() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_BANNERS}`);
}
function* getBannersSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getBanners)
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}

function* getCategories() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_CATEGORIES}`);
}
function* getCategoriesSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getCategories)
        // console.log('response=======>>>>>>>+++++', response.data);
        if (response?.data?.status) {
            // 🔽 Save categories globally
            yield put({ type: SET_CATEGORIES, payload: response?.data?.data });
        }
        action.callBack(response)
    } catch (error) {
        console.log('Categories API Error:', error?.message || error); // safer logging
        action.callBack({
            data: {
                status: false,
                message: error?.response?.data?.message || 'Something went wrong!',
            }
        });
    }
}

function* getProductsByCategory(payload) {
    // console.log(`paylod--->>>`, payload);

    return yield call(axios.post, `${BASE_URL}${END_POINTS.GET_PRODUCTS_BY_CATEGORY_API}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
function* getProductsByCategorySaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getProductsByCategory, action.payload)
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.log('getCategories API Error:', error?.message || error); // safer logging
        action.callBack(error);
    }
}


function* getProducts() {
    // console.log(`paylod--->>>`, payload);

    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_PRODUCTS}`);
}
function* getProductsSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getProducts, action.payload)
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.log('getCategories API Error:', error?.message || error); // safer logging
        action.callBack(error);
    }
}



function* editProfile(payload) {
    let formData = new FormData()
    Object.keys(payload).forEach(element => {
        formData.append(element, payload[element])
    });
    return yield call(axios.post, `${BASE_URL}${END_POINTS.EDIT_PROFILE_DATA}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
function* editProfileSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(editProfile, action.payload)
        // console.log('response=======>>>>>>>+++++', response?.data);
        action.callBack(response)
    } catch (error) {
        console.log('edit profile API Error:', error?.message || error); // safer logging
        action.callBack(error);
    }
}


function* getSearch(payload) {
    console.log(`payload --->>>`, payload);

    return yield call(axios.post, `${BASE_URL}${END_POINTS.SEARCH}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
function* getSearchSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getSearch, action.payload)
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.log('getCategories API Error:', error?.message || error); // safer logging
        action.callBack(error);
        console.log(`erorstack==============>>>>>>`, error.stack)
    }
}


function* getBannerProducts(payload) {
    // console.log(`payload --->>>`, payload);

    return yield call(axios.post, `${BASE_URL}${END_POINTS.GET_BANNER_PRODUCTS}`, payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
function* getBannerProductsSaga(action) {
    try {
        console.log('action--->>>>', action);
        const response = yield call(getBannerProducts, action.payload)
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.log('getCategories API Error:', error?.message || error); // safer logging
        action.callBack(error);
        console.log(`erorstack==============>>>>>>`, error.stack)
    }
}


export function* authSaga() {
    yield takeLatest(LOGIN_ACTION, loginSaga);
    yield takeLatest(SIGNUP_ACTION, signupSaga);
    yield takeLatest(VERIFY_EMAIL_ACTION, verifyEmailSaga);
    yield takeLatest(REQUEST_FORGET_PASSWORD_ACTION, forgotPasswordRequestSaga);
    yield takeLatest(VERIFY_FORGET_PASSWORD_OTP_ACTION, verifyForgotPasswordOtpSaga);
    yield takeLatest(RESET_PASSWORD_ACTION, resetPasswordSaga);
    yield takeLatest(GET_BANNERS_ACTION, getBannersSaga);
    yield takeLatest(GET_CATEGORIES_ACTION, getCategoriesSaga);
    yield takeLatest(GET_PRODUCTS_BY_CATEGORY, getProductsByCategorySaga);
    yield takeLatest(GET_PRODUCTS, getProductsSaga);
    yield takeLatest(GET_SEARCH, getSearchSaga);
    yield takeLatest(EDIT_PROFILE, editProfileSaga);
    yield takeLatest(GET_BANNER_PRODUCTS, getBannerProductsSaga);
}
export default authSaga;