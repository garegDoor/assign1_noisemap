class sceneName extends Phaser.Scene {
    constructor() {
        super("sceneKey");
    }

    preload() {
    }

    init() {
        this.tileset = {
            name: "terrain",        // name of tileset when added to Tiled (see Tile tutorial linked in README)
            key: "terrain-tiles"    // tilesheet key defined in load.js (or wherever)
        };
    }

    create() {
        console.log("Scene loaded");

        this.map = this.add.tilemap("map") // this is referencing the key to our Tiled JSON file
        const tilesheet = this.map.addTilesetImage(this.tileset.name, this.tileset.key);

        // load layers from Tiled to scene
        //      NOTE: by default, the layers will render in the order you define them 
        //            (so here, terrain is loaded, then decor is placed above it)
        //            See Phaser documentation for how to change layer order!
        this.terrainLayer = this.map.createLayer("terrain-layer", tilesheet, 0, 0);
        const decorLayer = this.map.createLayer("decor-layer", tilesheet, 0, 0);

        // testing putTileAt
        //this.terrainLayer.putTileAt(24, 0, 0);

        
        // initialize scaling var
        this.noiseWindowSize = 10;

        // detect when pressing keys
        this.input.keyboard.on('keydown-R', this.generateTiles, this);

        // Do first pass generation
        this.generateTiles();
    }

    update() {
    }

    generateTiles()
    {
        console.log('R pressed');

        //terrainLayer.putTileAt(24, 0, 0);
        //this.terrainLayer.putTileAt(24, 0, 0);
        //this.terrainLayer.putTileAt(19, 1, 0);
        //this.terrainLayer.putTileAt(203, 2, 0);

        // create new seed
        noise.seed(Math.random());

        for (var y = 0; y < this.map.height; y++)
        {
            var ratioY = y / this.map.height;

            for (var x = 0; x < this.map.width; x++)
            {
                var ratioX = x / this.map.width;

                var r = noise.perlin(ratioX * this.noiseWindowSize, ratioY * this.noiseWindowSize);

                if (r >= 0.5)
                {
                    var tileID = 24; // grass
                }
                else if (r >= 0.25)
                {
                    var tileID = 19; // sand
                }
                else
                {
                    var tileID = 203; // water
                }

                this.terrainLayer.putTileAt(tileID, x, y);
            }
        }
    }

}
