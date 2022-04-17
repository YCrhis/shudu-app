const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_NORMAL':
            return {
                ...state,
                isFetching: false,
                error: false
            }
        case 'LOGIN_START':
            return {
                ...state,
                isFetching: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isFetching: false
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload
            }
        case 'FOLLOW':
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                }
            }
        case 'UNFOLLOW':
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(f => f !== action.payload)
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export default AuthReducer;