var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
/**
 * Created by John on 2019/5/16.
 */
var BackStageReqUtils = (function () {
    function BackStageReqUtils() {
    }
    BackStageReqUtils.updateNowSvrTime = function (time) {
        this._svrTime = +time;
        this._syncTime = egret.getTimer();
    };
    BackStageReqUtils.getNowSvrTime = function () {
        if (!this._svrTime)
            return Date.now() / 1000;
        return this._svrTime + (egret.getTimer() - this._syncTime) / 1000;
    };
    //加载后台配置数据
    BackStageReqUtils.loadBackStageConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var param, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            ptid: window.platform.platID,
                            time: Date.now(),
                            version: 0
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendBackStageReq(window.platform.backUrlAddr + "/Server/gameconfig", param)];
                    case 2:
                        response = _a.sent();
                        this.backStageConfigs = response.data;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BackStageReqUtils.sendUserLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, param, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.backStageConfigs[0].apiUrl + "/Login/userlogin";
                        param = {
                            ptid: window.platform.platID,
                            zid: window.platform.svrID,
                            account: window.platform.account
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sendBackStageReq("" + url, param)];
                    case 2:
                        response = _a.sent();
                        this.backStageConfigs = response.data;
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //后台请求参数转换
    BackStageReqUtils.md5BackStageReqParam = function (param) {
        var keys = Object.keys(param);
        keys.sort();
        var str = "";
        var md5Str = "";
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (i > 0)
                str += "&";
            var value = param[key];
            str += key + "=" + value;
        }
        md5Str = str + "&key=" + window.platform.backUrlKey;
        var sign = MD5.hex_md5(md5Str);
        str += "&sign=" + sign;
        return str;
    };
    //发起后台请求
    BackStageReqUtils.sendBackStageReq = function (url, param) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var req = new egret.HttpRequest();
            req.responseType = egret.HttpResponseType.TEXT;
            var respHandler = function (evt) {
                switch (evt.type) {
                    case egret.Event.COMPLETE:
                        var data = JSON.parse(req.response);
                        resolve(data);
                        break;
                    case egret.IOErrorEvent.IO_ERROR:
                        console.log("\u8BF7\u6C42\u5931\u8D25\uFF1A" + url);
                        reject(data);
                        break;
                }
            };
            req.once(egret.Event.COMPLETE, respHandler, _this);
            req.once(egret.IOErrorEvent.IO_ERROR, respHandler, _this);
            if (param) {
                var searchStr = _this.md5BackStageReqParam(param);
                url += "?" + searchStr;
            }
            req.open("" + LocationParam.getProtocol() + url, egret.HttpMethod.GET);
            req.send();
        });
    };
    BackStageReqUtils.sendOpenReq = function () {
        var appid = 3;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") >= 0) {
            appid = 1;
        }
        else if (ua.indexOf("ios") >= 0 || ua.indexOf("ipad") >= 0) {
            appid = 2;
        }
        BackStageReqUtils.sendBackStageReq(BackStageReqUtils.getOpenAddr(), { ptid: window.platform.platID, appid: appid, phonecode: MD5.hex_md5(ua), time: (Date.now() / 1000) >> 0 });
    };
    /**
     * 获取游戏客户端入口地址
     */
    BackStageReqUtils.getGameClientAddr = function () {
        return "" + this.backStageConfigs[0].resBaseUrl;
    };
    /**
     * 获取悦玩登录校验地址
     */
    BackStageReqUtils.getYueWanLoginAddr = function () {
        return this.backStageConfigs[0].commurl + "/YuewanLogin/login";
    };
    /**
     * 获取后台公告地址
     */
    BackStageReqUtils.getGongGaoAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/server/gonggao";
    };
    /**
     * 获取最近登录信息
     */
    BackStageReqUtils.getMySvrListAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/Newserver/selectzone";
    };
    /**
     * 获取一页服务器信息
     */
    BackStageReqUtils.getPageSvrListAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/Newserver/list";
    };
    /**
     * 获取单个服务器的信息
     */
    BackStageReqUtils.getSingleSvrInfoAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/Newserver/info";
    };
    /**
     * 用户登录数据收集接口
     */
    BackStageReqUtils.getLoginRecordAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/Login/userlogin";
    };
    /**
     * 获取服务器时间
     */
    BackStageReqUtils.getNowSvrTimeAddr = function () {
        return this.backStageConfigs[0].commurl + "/Server/nowtime";
    };
    /**
     * 激活数据收集接口地址
     */
    BackStageReqUtils.getOpenAddr = function () {
        return this.backStageConfigs[0].apiUrl + "/Open/addlog";
    };
    return BackStageReqUtils;
}());
__reflect(BackStageReqUtils.prototype, "BackStageReqUtils");
//# sourceMappingURL=BackStageReqUtils.js.map