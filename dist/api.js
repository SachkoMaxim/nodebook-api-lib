"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, config = {}) {
    const { baseURL = '', method = 'GET', headers = {}, body, withCredentials = true, timeout = 30000, signal, cache = 'default', } = config;
    const defaultHeaders = Object.assign({ 'Content-Type': 'application/json', Accept: 'application/json' }, headers);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const options = {
            method,
            headers: defaultHeaders,
            credentials: withCredentials ? 'include' : 'same-origin',
            signal: signal || controller.signal,
            cache,
        };
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        const response = yield fetch(baseURL + url, options);
        clearTimeout(timeoutId);
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json')) {
            data = yield response.json();
        }
        else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('text')) {
            data = (yield response.text());
        }
        else {
            data = (yield response.blob());
        }
        if (!response.ok) {
            const error = new Error(response.statusText);
            error.status = response.status;
            error.statusText = response.statusText;
            error.data = data;
            throw error;
        }
        return {
            data,
            status: response.status,
            headers: response.headers,
        };
    }
    catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeout}ms`);
        }
        throw error;
    }
});
const api = {
    get: (url, config = {}) => request(url, Object.assign(Object.assign({}, config), { method: 'GET' })),
    post: (url, config = {}) => request(url, Object.assign(Object.assign({}, config), { method: 'POST' })),
    put: (url, config = {}) => request(url, Object.assign(Object.assign({}, config), { method: 'PUT' })),
    delete: (url, config = {}) => request(url, Object.assign(Object.assign({}, config), { method: 'DELETE' })),
    patch: (url, config = {}) => request(url, Object.assign(Object.assign({}, config), { method: 'PATCH' })),
};
exports.default = api;
