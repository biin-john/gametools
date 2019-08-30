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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        RES.getVirtualUrl = function (url) {
            if (window.publishVer) {
                return window.publishVer + "/" + url;
            }
            return url + "?v=" + window.debugVer;
        };
        this.uiLayer = new eui.UILayer();
        this.uiLayer.percentHeight = 100;
        this.uiLayer.percentWidth = 100;
        this.uiLayer.touchEnabled = false;
        egret.lifecycle.stage.addChild(this.uiLayer);
        this.backImg = new eui.Image();
        this.backImg.horizontalCenter = this.backImg.verticalCenter = 0;
        this.uiLayer.addChild(this.backImg);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        egret.ImageLoader.crossOrigin = "anonymous";
        LocationParam.parseLocation();
        this.initPlatform();
        this.loginPlat();
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.initPlatform = function () {
        var platID = LocationParam.getValue("plat_id") || PlatType.Debug;
        switch (+platID) {
            case PlatType.MiKe:
                window.platform = new MiKePlatform();
                break;
            case PlatType.YueWan:
                window.platform = new YueWanPlatform();
                break;
            case PlatType.Debug:
                window.platform = new DebugPlatform();
                break;
        }
    };
    Main.prototype.loginPlat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.platform.platID) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, BackStageReqUtils.loadBackStageConfig()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, window.platform.init()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, window.platform.login()];
                    case 4:
                        _a.sent();
                        BackStageReqUtils.sendOpenReq();
                        return [4 /*yield*/, BackStageReqUtils.sendBackStageReq(BackStageReqUtils.getNowSvrTimeAddr(), { nowtime: (Date.now() / 1000) >> 0 })];
                    case 5:
                        data = _a.sent();
                        if (+data.stat == 0) {
                            BackStageReqUtils.updateNowSvrTime(data.data);
                        }
                        if (this.uiLayer.parent) {
                            this.uiLayer.parent.removeChild(this.uiLayer);
                        }
                        this.showSelectServerScene();
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.loginPlat();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.backImg.source = "denglubg_jpg";
                        this.loadResComplete = true;
                        this.showSelectServerScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        path = true ? "resource/default.res.json" : "resource/res.pub.json";
                        return [4 /*yield*/, RES.loadConfig(path, "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
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
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.showSelectServerScene = function () {
        if (!this.loadResComplete)
            return;
        if (window.platform.isDebug) {
            App.SceneManager.runScene(PlatLoginScene);
            return;
        }
        if (!window.platform.userID)
            return;
        App.SceneManager.runScene(SelectServerScene);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map