import * as TYPES from './types'

export const loginAction = (payload, callBack) => ({
    type: TYPES['LOGIN_ACTION'], payload, callBack
})

export const signupAction = (payload, callBack) => ({
    type: TYPES['SIGNUP_ACTION'], payload, callBack
})

export const verifyEmailAction = (payload, callBack) => ({
    type: TYPES['VERIFY_EMAIL_ACTION'], payload, callBack
})

export const requestForgetPasswordAction = (payload, callBack) => ({
    type: TYPES['REQUEST_FORGET_PASSWORD_ACTION'], payload, callBack
})
export const verifyForgetPasswordOtpAction = (payload, callBack) => ({
    type: TYPES['VERIFY_FORGET_PASSWORD_OTP_ACTION'], payload, callBack
})
export const resetPasswordAction = (payload, callBack) => ({
    type: TYPES['RESET_PASSWORD_ACTION'], payload, callBack
})

export const getBannersAction = (callBack) => ({
    type: TYPES['GET_BANNERS_ACTION'], callBack
})

export const getCategoriesAction = (callBack) => ({
    type: TYPES['GET_CATEGORIES_ACTION'], callBack
})

export const getProductsByCategoryAction = (payload, callBack) => ({
    type: TYPES['GET_PRODUCTS_BY_CATEGORY'], payload, callBack
})

export const getProductsAction = (callBack) => ({
    type: TYPES['GET_PRODUCTS'], callBack
})

export const getSearchAction = (payload, callBack) => ({
    type: TYPES['GET_SEARCH'], payload, callBack
})
export const editProfileAction = (payload, callBack) => ({
    type: TYPES['EDIT_PROFILE'], payload, callBack
})
export const getBannerProductsAction = (payload, callBack) => ({
    type: TYPES['GET_BANNER_PRODUCTS'], payload, callBack
})

