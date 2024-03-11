import {
    createRequestsLicense,
    requestCreateResume,
    requestGetControlMethods,
    requestGetControlObjects, requestGetLicensePrice,
    requestGetProfile, requestGetPublicStat, requestGetResume, requestGetTreeNodeRoots,
    requestGetUserQualification, requestLogout
} from "../server/requests";
import {Dispatch} from "redux";
import {ActionsBill, ActionsService, ActionsUser} from "./actions";
import {LicenseRequestModel, TreeNodeModel} from "../server/models/models";
import {LicenseTypes, PopUpTypeConstants, TreeNodeNames} from "../constants/type-constants";
import {RouterConstantsHome} from "../constants/router-constants";
import {isInspectorRole} from "../utils/utils";

export const getUserProfile = (callback?: () => void) => {
    return (dispatch: Dispatch) => {
        requestGetProfile().then(response => {
            if (response.status == 200) {
                dispatch({type: ActionsUser.USER_LOGIN, payload: true});
                dispatch({type: ActionsUser.USER_PROFILE, payload: response.data});
                if (isInspectorRole(response.data.role)) {
                    // @ts-ignore
                    dispatch(getUserResume(response.data.resumeId, response.data.id));
                }
            }
            else {
                dispatch({type: ActionsUser.USER_LOGIN, payload: false});
                console.log(response);
            }
        }).finally(() => {
            if (callback)
                callback();
        });
    };
};

export const getUserResume = (idResume: number, idUser: number) => {
    return (dispatch: Dispatch) => {
        if (idResume) {
            requestGetResume(idResume).then(response => {
                if (response.status == 200)
                    dispatch({type: ActionsUser.USER_RESUME, payload: response.data});
                else
                    console.log(response);
            });
        } else {
            requestCreateResume(idUser).then(response => {
                if (response.status == 201)
                {
                    // @ts-ignore
                    dispatch(getUserResume(response.data, idUser));
                }
                else console.log(response);
            });
        }
    };
};


export const getDictionary = () => {
    return (dispatch: Dispatch) => {
        requestGetControlMethods().then(response => {
            if (response.status == 200)
                dispatch({type: ActionsService.CONTROL_METHODS, payload: response.data});
            else
                console.log(response);
        });

        requestGetControlObjects().then(response => {
            if (response.status == 200)
                dispatch({type: ActionsService.CONTROL_OBJECTS, payload: response.data});
            else
                console.log(response);
        });

        requestGetUserQualification().then(response => {
            if (response.status == 200)
                dispatch({type: ActionsService.USER_QUALIFICATION, payload: response.data});
            else
                console.log(response);
        });

        requestGetLicensePrice().then(response => {
            if (response.status == 200)
                dispatch({type: ActionsBill.UPDATE_PRICE, payload: response.data});
            else
                console.log(response);
        });

    };
};

export const getRootNodes = (condition: TreeNodeNames, setResultCallback: Function) => {
    return (dispatch: Dispatch) => {
        requestGetTreeNodeRoots().then(response => {
            if (response.status === 200) {
                const files = response.data.find((item: TreeNodeModel) => item.name === condition);
                setResultCallback(files.children);
            } else
                dispatch({type: ActionsService.SHOW_POPUP, payload: {message: "Не удалось загрузить дерево", type: PopUpTypeConstants.ERROR}});
        });
    }
}

export const logOut = () => {
    return (dispatch: Dispatch) => {
        requestLogout().then(response => {
            if (response.status == 200) {
                dispatch({type: ActionsUser.USER_LOGIN, payload: false});
                dispatch({type: ActionsUser.USER_PROFILE, payload: undefined});
                localStorage.setItem(ActionsUser.USER_LOGIN, "false");
                window.location.href =  RouterConstantsHome.AUTH;
            } else {
                dispatch({type: ActionsService.SHOW_POPUP, payload: {message: "Ошибка выхода из системы", type: PopUpTypeConstants.ERROR}});
            }
        });
    }
}


export const updatePublicStat = () => {
    return (dispatch: Dispatch) => {
        requestGetPublicStat().then((response) => {
            if (response.status == 200) {
                dispatch({type: ActionsService.USERS_ONLINE_COUNT, payload: response.data?.registeredCount});
            }
        })
    }
}

export const sendBill = (bill: LicenseRequestModel, callback: Function) => {
    return (dispatch: Dispatch) => {
        createRequestsLicense(bill).then((response) => {
            if (response.status == 200) {
                dispatch({type: ActionsBill.UPDATE_BILL, payload: {
                    count: 1, type: LicenseTypes.MONTH
                }});
                callback();
                dispatch({type: ActionsService.SHOW_POPUP, payload: {message: "Информация отправлена", type: PopUpTypeConstants.SUCCESS}});
            } else
                dispatch({type: ActionsService.SHOW_POPUP, payload: {message: "Ошибка при отправке, попробуйте позже", type: PopUpTypeConstants.ERROR}});
        });
    };
}