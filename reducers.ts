import {combineReducers} from "redux";
import {ActionsBill, ActionsService, ActionsUser} from "./actions";
import {
    LicenseRequestModel,
    LicensePrice,
    UserProfileModel,
    UserResumeModel
} from "../server/models/models";
import {LicenseTypes, PopUpTypeConstants} from "../constants/type-constants";

const initialUserState: UserStore = {};
const initialServiceState: ServiceStore = {};
const initialBillState: BillStore = {
    bill: {
        count: 1,
        type: LicenseTypes.MONTH,
        needContract: false
    }
};

const rootReducer = combineReducers({
    userStore: userReducer,
    serviceStore: serviceReducer,
    billStore: billReducer
});

function userReducer(state = initialUserState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case ActionsUser.USER_LOGIN: {
            localStorage.setItem(ActionsUser.USER_LOGIN, action.payload);
            return {...state, isLoggedIn: action.payload}
        }
        case ActionsUser.USER_ID: {
            return {...state, userId: action.payload}
        }
        case ActionsUser.USER_PROFILE: {
            return {...state, userProfile: action.payload}
        }
        case ActionsUser.USER_RESUME: {
            return {...state, userResume: action.payload}
        }
        default:
            return state;
    }
}

function serviceReducer(state = initialServiceState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case ActionsService.SHOW_POPUP: {
            return {...state, messagePopUp: action.payload}
        }
        case ActionsService.CONTROL_METHODS: {
            return {...state, controlMethods: action.payload}
        }
        case ActionsService.CONTROL_OBJECTS: {
            return {...state, controlObjects: action.payload}
        }
        case ActionsService.USER_QUALIFICATION: {
            return {...state, userQualifications: action.payload}
        }
        case ActionsService.USERS_ONLINE_COUNT: {
            return {...state, usersOnlineCount: action.payload}
        }
        case ActionsService.SHOW_LICENSE_REQUIRED: {
            return {...state, showLicenseRequired: action.payload}
        }
        default:
            return state;
    }
}
function billReducer(state = initialBillState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case ActionsBill.UPDATE_BILL: {
            return {...state, bill: action.payload}
        }
        case ActionsBill.UPDATE_CONTRACT: {
            const bill = state.bill;
            bill.needContract = action.payload;
            return {...state, bill: bill}
        }
        case ActionsBill.UPDATE_PRICE: {
            return {...state, price: action.payload}
        }
        default:
            return state;
    }
}


export interface UserStore {
    isLoggedIn?: boolean;
    userId?: string;
    userProfile?: UserProfileModel;
    userResume?: UserResumeModel;
}

export interface ServiceStore {
    messagePopUp?: MessagePopUp;
    controlMethods?: Array<Dictionary>;
    controlObjects?: Array<Dictionary>;
    userQualifications?: Array<{
        description: string,
        id: number
    }>;
    usersOnlineCount?: number;
    licenseRequired?: boolean;
}

export interface BillStore {
    bill: LicenseRequestModel;
    price: Array<LicensePrice>;
}

export interface MessagePopUp {
    message: string,
    type:PopUpTypeConstants,
}

export interface Dictionary {
    code: string,
    id: number,
    name: string,
    submethods?: Array<Dictionary>,
    children?: Array<Dictionary>
}

export default rootReducer;
