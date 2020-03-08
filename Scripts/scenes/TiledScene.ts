module scenes
{
    export class TiledScene extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _backgroundTiles: objects.Grid;
        private _foregroundTiles: objects.Grid;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void
        {
             //instantiate a new Text object
             this._backgroundTiles = new objects.Grid(config.Game.BG_MAP, 20, 15, 32);
             this._foregroundTiles = new objects.Grid(config.Game.FG_MAP, 20, 15, 32);
            this.Main();
        }

        public Update(): void
        {

        }

        public Main(): void
        {
           this._backgroundTiles.stringToGrid(config.Game.ASSETS.getResult("bgmap"));
          this._backgroundTiles.buildTiles();
          this._backgroundTiles.drawTiles(this);

          this._foregroundTiles.stringToGrid(config.Game.ASSETS.getResult("fgmap"));
          this._foregroundTiles.buildTiles();
          this._foregroundTiles.drawTiles(this);
        }


    }
}
