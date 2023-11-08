import { createAction, props } from "@ngrx/store";

export const loginRequest = createAction(
    'Auth Login Request',
    props<{credentials:{ email : string; password : string }}>()
);      

export const loginSuccess = createAction(
    'Auth Login Success',
    props<{ user : any; token : string }>()
);

export const loginFailure = createAction(
    'Auth Login Faliure',
    props<{ error : string }>()
);