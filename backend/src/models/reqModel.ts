import { Request } from "express"

export interface fileReq extends Request{
    files : any
}

export interface headerReq extends Request{
    headers : {
        authorization : string
    }
    user : any
}