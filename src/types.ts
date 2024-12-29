import { RequestConfig } from './interfaces'

export type GetConfig = Omit<RequestConfig, 'method'>
export type PostConfig = Omit<RequestConfig, 'method'>
export type PutConfig = Omit<RequestConfig, 'method'>
export type DeleteConfig = Omit<RequestConfig, 'method'>
export type PatchConfig = Omit<RequestConfig, 'method'>
