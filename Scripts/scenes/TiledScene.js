"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var TiledScene = /** @class */ (function (_super) {
        __extends(TiledScene, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function TiledScene() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        TiledScene.prototype.Start = function () {
            //instantiate a new Text object
            this._backgroundTiles = new objects.Grid(config.Game.BG_MAP, 20, 15, 32);
            this._foregroundTiles = new objects.Grid(config.Game.FG_MAP, 20, 15, 32);
            this.Main();
        };
        TiledScene.prototype.Update = function () {
        };
        TiledScene.prototype.Main = function () {
            this._backgroundTiles.stringToGrid(config.Game.ASSETS.getResult("bgmap"));
            this._backgroundTiles.buildTiles();
            this._backgroundTiles.drawTiles(this);
            this._foregroundTiles.stringToGrid(config.Game.ASSETS.getResult("fgmap"));
            this._foregroundTiles.buildTiles();
            this._foregroundTiles.drawTiles(this);
        };
        return TiledScene;
    }(objects.Scene));
    scenes.TiledScene = TiledScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=TiledScene.js.map