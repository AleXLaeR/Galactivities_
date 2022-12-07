export const ROUTES = {
    ACTIVITIES: {
        LIST: '/activities',
        CREATE: '/create',
        EDIT: '/manage',
        ATTEND: '/attend'
    },
    ACCOUNT: {
        CURRENT_USER: '/account',
        LOGIN: '/account/login',
        REGISTER: '/account/register'
    },
    PROFILE: {
        BASE: '/profiles',
        CURRENT_USER: '/users'
    },
    IMAGES: {
        BASE: '/images'
    },
    ERROR: {
        NOT_FOUND: '/not-found',
        UNAUTHORIZED: '/unauthorized'
    }
}

export const DATE_FORMAT = {
    FULL_TIME_ABBR: 'h:mm a',
    DAY_WITH_MONTH_LOWERCASE: 'do LLL',
    MONTH_ABBR_UPPERCASE: 'dd MMM yyyy',
    TIME_ABBR_LOWERCASE: 'dd MMM yyyy h:mm aa',
    FULL_MONTH_DAY_NUMBER: 'MMMM d, yyyy h:mm aa'
}

export const IMAGE_URIS = {
    USER_DEFAULT: '/assets/user.png',
    MAIN_LOGO: '/assets/logo.png',
    BASE: '/assets/categoryImages'
}

export const APP_NAME = 'Galactivities';