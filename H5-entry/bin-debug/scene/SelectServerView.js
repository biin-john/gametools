var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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
 * Created by John on 2019/5/10.
 */
var SelectServerView = (function (_super) {
    __extends(SelectServerView, _super);
    function SelectServerView() {
        var _this = _super.call(this) || this;
        _this.pageSize = 10;
        _this.skinName = "EnterGameSceneSkin";
        _this.tipsLabel.visible = false;
        _this.pageList.itemRenderer = ServerPageItemRender;
        _this.serverList.itemRenderer = ServerItemRender;
        _this.pageList.dataProvider.source = [];
        _this.serverList.dataProvider.source = [];
        _this.gonggaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchGongGao, _this);
        _this.selectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchSelect, _this);
        _this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchClose, _this);
        _this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchEnter, _this);
        _this.pageList.addEventListener(egret.Event.CHANGE, _this.onPageChanged, _this);
        _this.serverList.addEventListener(egret.Event.CHANGE, _this.onServerChanged, _this);
        _this.reqMySvrList();
        return _this;
    }
    SelectServerView.prototype.onTouchGongGao = function () {
        if (this.gongGaoGrp) {
            this.gongGaoGrp.visible = true;
        }
        this.reqGongGao();
    };
    SelectServerView.prototype.onSuggestSvrsLoaded = function () {
        var svrCount = +this.suggestData.total;
        var pageCount = Math.floor(svrCount / this.pageSize) + (svrCount % this.pageSize > 0 ? 1 : 0);
        var pageDatas = [];
        for (var i = 0; i < pageCount; i++) {
            var obj = {};
            obj.page = i + 1;
            var start = i * this.pageSize + 1;
            var end = (i + 1) * this.pageSize;
            obj.name = start + "-" + end + "\u670D";
            pageDatas.push(obj);
        }
        pageDatas.push({ isMy: true, name: "最近登录" });
        pageDatas = pageDatas.reverse();
        this.pageList.dataProvider.source = pageDatas;
        this.setSelectSvr(this.suggestData.mine[0] || this.suggestData.tj[0]);
    };
    SelectServerView.prototype.setSelectSvr = function (data) {
        this.tipsLabel.visible = false;
        this.selectedServer = data;
        this.svrStateIcon.source = "svr_state_" + data.state + "_png";
        this.svrNameLabel.text = data.zname;
    };
    SelectServerView.prototype.onTouchSelect = function () {
        this.selectSvrGrp.visible = true;
        this.pageList.selectedIndex = 0;
        this.updateServerPage();
    };
    SelectServerView.prototype.updateServerPage = function (pageData) {
        if (pageData) {
            this.serverList.dataProvider.source = pageData;
            return;
        }
        var data = this.pageList.selectedItem;
        if (data.isMy) {
            this.serverList.dataProvider.source = this.suggestData.mine;
            return;
        }
        this.serverList.dataProvider.source = [];
        this.reqSvrListByPage(data.page, this.pageSize);
    };
    SelectServerView.prototype.onTouchClose = function () {
        this.selectSvrGrp.visible = false;
    };
    SelectServerView.prototype.onTouchEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var platform, selectSvr, response, data, svrState, gameClientAddr, winHref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        platform = window.platform;
                        selectSvr = this.selectedServer;
                        if (!selectSvr)
                            return [2 /*return*/];
                        return [4 /*yield*/, BackStageReqUtils.sendBackStageReq(BackStageReqUtils.getSingleSvrInfoAddr(), { ptid: platform.platID, zid: selectSvr.zid })];
                    case 1:
                        response = _a.sent();
                        if (!response.stat) {
                            return [2 /*return*/];
                        }
                        data = response.data;
                        if (data.zid != this.selectedServer.zid)
                            return [2 /*return*/];
                        selectSvr = this.selectedServer;
                        selectSvr.state = data.state;
                        selectSvr.open_time = data.open_time;
                        svrState = +this.selectedServer.state;
                        if (svrState == ServerState.daikai || BackStageReqUtils.getNowSvrTime() < (+selectSvr.open_time || 0)) {
                            this.tipsLabel.text = "服务器即将开启";
                            this.tipsLabel.visible = true;
                            return [2 /*return*/];
                        }
                        if (svrState == ServerState.weihu) {
                            this.tipsLabel.text = "服务器维护中";
                            this.tipsLabel.visible = true;
                            return [2 /*return*/];
                        }
                        this.tipsLabel.visible = false;
                        platform.svrID = selectSvr.zid;
                        BackStageReqUtils.sendUserLogin();
                        gameClientAddr = BackStageReqUtils.getGameClientAddr();
                        winHref = "" + LocationParam.getProtocol() + gameClientAddr + "game.html"
                            + ("?plat_id=" + platform.platID)
                            + ("&uid=" + platform.userID)
                            + (platform.userName ? "&username=" + platform.userName : "")
                            + (platform.time ? "&time=" + platform.time : "")
                            + (platform.channelUID ? "&channelUid=" + platform.channelUID : "")
                            + (platform.channelName ? "&channel=" + platform.channelName : "")
                            + ("&token=" + platform.token)
                            + ("&resurl=" + gameClientAddr)
                            + ("&sid=" + this.selectedServer.zid)
                            + ("&sname=" + this.selectedServer.zname)
                            + ("&wsurl=" + this.selectedServer.ip + ":" + this.selectedServer.port);
                        window.location.href = winHref;
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectServerView.prototype.onPageChanged = function () {
        this.updateServerPage();
    };
    SelectServerView.prototype.onServerChanged = function () {
        this.setSelectSvr(this.serverList.selectedItem);
        this.selectSvrGrp.visible = false;
    };
    //发送Http请求
    // sendRequest(url: string, param: any, callback?: (data: any) => void) {
    //     let req = new egret.HttpRequest();
    //     req.responseType = egret.HttpResponseType.TEXT;
    //     let respHandler = (evt: egret.Event) => {
    //         switch (evt.type) {
    //             case egret.Event.COMPLETE:
    //                 if (callback) {
    //                     let data = JSON.parse(req.response);
    //                     callback(data);
    //                 }
    //                 break;
    //             case egret.IOErrorEvent.IO_ERROR:
    //                 console.log("respHandler io error");
    //                 break;
    //         }
    //     };
    //     req.once(egret.Event.COMPLETE, respHandler, this);
    //     req.once(egret.IOErrorEvent.IO_ERROR, respHandler, this);
    //     let sign = this.md5SearchParam(param);
    //     let searchStr = this.md5SearchParam(param);
    //     req.open(`${url}?${searchStr}`, egret.HttpMethod.GET);
    //     req.send();
    // }
    //请求公告数据
    SelectServerView.prototype.reqGongGao = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, param, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.gonggaoData) {
                            this.updateGongGao();
                            return [2 /*return*/];
                        }
                        url = BackStageReqUtils.getGongGaoAddr();
                        param = {
                            ptid: window.platform.platID,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BackStageReqUtils.sendBackStageReq(url, param)];
                    case 2:
                        data = _a.sent();
                        if (+data.stat != 0)
                            return [2 /*return*/];
                        this.gonggaoData = data.data;
                        this.updateGongGao();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectServerView.prototype.updateGongGao = function () {
        if (this.gongGaoLabel)
            this.gongGaoLabel.text = this.gonggaoData.content;
    };
    //请求游戏url配置数据
    // async reqGameConfig() {
    //     try {
    //         await BackStageReqUtils.loadBackStageConfig();
    //         this.clientConfig = BackStageReqUtils.backStageConfigs;
    //     }
    //     catch (e) {
    //         // this.reqGameConfig();
    //     }
    // }
    //获取推荐服，服务器总数，最近登录数据
    SelectServerView.prototype.reqMySvrList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, param, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = BackStageReqUtils.getMySvrListAddr();
                        param = {
                            ptid: window.platform.platID,
                            account: window.platform.account,
                            time: Date.now(),
                            version: 0
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BackStageReqUtils.sendBackStageReq(url, param)];
                    case 2:
                        response = _a.sent();
                        this.suggestData = response.data;
                        this.onSuggestSvrsLoaded();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectServerView.prototype.reqSvrListByPage = function (page, pageCount) {
        return __awaiter(this, void 0, void 0, function () {
            var url, param, data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = BackStageReqUtils.getPageSvrListAddr();
                        param = {
                            ptid: window.platform.platID,
                            version: 0,
                            page: page,
                            row: pageCount,
                            time: Date.now(),
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, BackStageReqUtils.sendBackStageReq(url, param)];
                    case 2:
                        data = _a.sent();
                        this.updateServerPage(data.zones);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SelectServerView;
}(BaseSceneView));
__reflect(SelectServerView.prototype, "SelectServerView");
var ServerPageItemRender = (function (_super) {
    __extends(ServerPageItemRender, _super);
    function ServerPageItemRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerPageItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.nameLabel.text = this.data.name;
    };
    return ServerPageItemRender;
}(eui.ItemRenderer));
__reflect(ServerPageItemRender.prototype, "ServerPageItemRender");
var ServerItemRender = (function (_super) {
    __extends(ServerItemRender, _super);
    function ServerItemRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.stateIcon.source = "svr_state_" + data.state + "_png";
        this.nameLabel.text = data.zname;
        this.suggestIcon.visible = data.state == "0";
    };
    return ServerItemRender;
}(eui.ItemRenderer));
__reflect(ServerItemRender.prototype, "ServerItemRender");
var ServerState;
(function (ServerState) {
    ServerState[ServerState["tuijian"] = 0] = "tuijian";
    ServerState[ServerState["zhengchang"] = 1] = "zhengchang";
    ServerState[ServerState["huobao"] = 2] = "huobao";
    ServerState[ServerState["yongji"] = 3] = "yongji";
    ServerState[ServerState["tongchang"] = 4] = "tongchang";
    ServerState[ServerState["daikai"] = 5] = "daikai";
    ServerState[ServerState["weihu"] = 6] = "weihu";
})(ServerState || (ServerState = {}));
//# sourceMappingURL=SelectServerView.js.map