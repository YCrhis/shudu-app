export const LoginStart = (userCredential) => ({
    type: 'LOING_START'
})

export const LoginNormal = (userCredential) => ({
    type: 'LOING_NORMAL'
})


export const LoginSuccess = (user) => ({
    type: 'LOING_SUCCESS',
    payload: user
})

export const LoginFailure = (error) => ({
    type: 'LOING_FAILURE',
    payload: error
})

export const Follow = (userId) => ({
    type: 'FOLLOW',
    payload: userId
})

export const Unfollow = (userId) => ({
    type: 'UNFOLLOW',
    payload: userId
})


export const LOGOUT = (user) => ({
    type: 'LOGOUT',
})