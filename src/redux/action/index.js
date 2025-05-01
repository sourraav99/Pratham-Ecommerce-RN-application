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
