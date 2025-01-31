export interface jsonRespone{
    success : boolean;
    payload: any
}

export interface storeState{
    authorized : boolean;
    setAuthorized : (v : boolean) => void
}