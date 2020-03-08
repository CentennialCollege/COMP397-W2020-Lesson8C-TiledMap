//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;

    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;
    let backgroundTextureMap: createjs.SpriteSheet;
    let foregroundTextureMap: createjs.SpriteSheet;

    let assetManifest =
    [
        {id:"button", src:"./Assets/images/button.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"backButton", src:"./Assets/images/backButton.png"},
        {id:"ocean", src:"./Assets/images/ocean.gif"},
        {id:"plane", src:"./Assets/images/plane.png"},
        {id:"island", src:"./Assets/images/island.png"},
        {id:"cloud", src:"./Assets/images/cloud.png"},
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        {id:"yay", src:"./Assets/audio/yay.ogg"},
        {id:"thunder", src:"./Assets/audio/thunder.ogg"},
        {id:"bgmap", src:"./Assets/data/background.txt"},
        {id:"fgmap", src:"./Assets/data/foreground.txt"},
        {id:"background", src:"./Assets/sprites/background.png"},
        {id:"foreground", src:"./Assets/sprites/foreground.png"}
    ];

    let backgroundTextureData =
    {
      "images": Array<Object>(),
      "frames": [
          [0, 0, 32, 32, 0, 0, 0],
          [32, 0, 32, 32, 0, 0, 0],
          [64, 0, 32, 32, 0, 0, 0],
          [96, 0, 32, 32, 0, 0, 0],
          [128, 0, 32, 32, 0, 0, 0],
          [160, 0, 32, 32, 0, 0, 0],
          [192, 0, 32, 32, 0, 0, 0],
          [224, 0, 32, 32, 0, 0, 0],
          [256, 0, 32, 32, 0, 0, 0]
      ],
      "animations": {
          "BG-23": [0],
          "BG-24": [1],
          "BG-25": [2],
          "BG-46": [3],
          "BG-47": [4],
          "BG-48": [5],
          "BG-69": [6],
          "BG-70": [7],
          "BG-71": [8]
      }
    }

    let foregroundTextureData =
    {

      "images": Array<Object>(),
      "frames": [
          [0, 0, 32, 32, 0, 0, 0],
          [32, 0, 32, 32, 0, 0, 0],
          [64, 0, 32, 32, 0, 0, 0],
          [96, 0, 32, 32, 0, 0, 0],
          [128, 0, 32, 32, 0, 0, 0],
          [160, 0, 32, 32, 0, 0, 0],
          [192, 0, 32, 32, 0, 0, 0],
          [224, 0, 32, 32, 0, 0, 0],
          [256, 0, 32, 32, 0, 0, 0],
          [288, 0, 32, 32, 0, 0, 0],
          [320, 0, 32, 32, 0, 0, 0],
          [352, 0, 15, 14, 0, -8, 0],
          [367, 0, 25, 23, 0, -3, -4],
          [392, 0, 20, 28, 0, -6, 0],
          [412, 0, 32, 32, 0, 0, 0],
          [444, 0, 32, 32, 0, 0, 0],
          [476, 0, 30, 27, 0, -2, -5],
          [506, 0, 31, 27, 0, 0, -5],
          [537, 0, 12, 28, 0, -20, 0],
          [549, 0, 13, 26, 0, 0, 0],
          [562, 0, 32, 32, 0, 0, 0],
          [594, 0, 32, 32, 0, 0, 0],
          [626, 0, 32, 32, 0, 0, 0]
      ],
      "animations": {
          "FG-26": [0],
          "FG-27": [1],
          "FG-28": [2],
          "FG-31": [3],
          "FG-72": [4],
          "FG-73": [5],
          "FG-74": [6],
          "FG-95": [7],
          "FG-96": [8],
          "FG-97": [9],
          "FG-98": [10],
          "FG-100": [11],
          "FG-162": [12],
          "FG-253": [13],
          "FG-276": [14],
          "FG-277": [15],
          "FG-278": [16],
          "FG-279": [17],
          "FG-298": [18],
          "FG-299": [19],
          "FG-300": [20],
          "FG-301": [21],
          "FG-487": [22],
      }

      }

    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        // setup background texturemap
        backgroundTextureData.images = [config.Game.ASSETS.getResult("background")];
        backgroundTextureMap = new createjs.SpriteSheet(backgroundTextureData);
        config.Game.BG_MAP = backgroundTextureMap;

        // setup foreground texturemap
        foregroundTextureData.images = [config.Game.ASSETS.getResult("foreground")];
        foregroundTextureMap = new createjs.SpriteSheet(foregroundTextureData);
        config.Game.FG_MAP = foregroundTextureMap;

        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.TILED;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();

        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }

        // switch to the new scene

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
            case scenes.State.TILED:
              console.log("switch to Tiled Scene");
              currentScene = new scenes.TiledScene();
              break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();
