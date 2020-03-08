module config
{
    export class Game
    {
        public static SCREEN_WIDTH:number = 640;
        public static SCREEN_HEIGHT:number = 480;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static BG_MAP: createjs.SpriteSheet;
        public static FG_MAP: createjs.SpriteSheet;
        public static FPS: number = 60; // 60 Frames per second
        public static CLOUD_NUM: number = 4;
    }
}
