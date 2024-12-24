var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useEffect } from 'react';
export function useData(_a) {
    var _this = this;
    var _b, _c;
    var apiKey = _a.apiKey, endpoint = _a.endpoint, id = _a.id, baseUrl = _a.baseUrl;
    var _d = useState(null), result = _d[0], setResult = _d[1];
    var _e = useState(true), loading = _e[0], setLoading = _e[1];
    var _f = useState(undefined), error = _f[0], setError = _f[1];
    var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
        var API_URL, finalEndpoint, url, response, rawResult, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    API_URL = baseUrl;
                    if (!API_URL) {
                        throw new Error('baseUrl is required');
                    }
                    finalEndpoint = id ? "".concat(endpoint, "/").concat(id) : endpoint;
                    url = "".concat(API_URL).concat(finalEndpoint);
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                Authorization: "Bearer ".concat(apiKey),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    rawResult = _a.sent();
                    if (!response.ok) {
                        throw new Error("API Error: ".concat(response.status, " ").concat(response.statusText));
                    }
                    setResult(rawResult);
                    setError(undefined);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error('Fetch error:', err_1);
                    setError(err_1 instanceof Error ? err_1.message : 'Unknown error');
                    setResult(null);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchData();
    }, [apiKey, endpoint, id, baseUrl]);
    return {
        items: ((_b = result === null || result === void 0 ? void 0 : result.data) === null || _b === void 0 ? void 0 : _b.data) || [],
        metadata: (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.metadata,
        error: error,
        loading: loading,
        refetch: fetchData
    };
}
