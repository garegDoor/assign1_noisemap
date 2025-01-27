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

        const map = this.add.tilemap("map") // this is referencing the key to our Tiled JSON file
        const tilesheet = map.addTilesetImage(this.tileset.name, this.tileset.key);

        // load layers from Tiled to scene
        //      NOTE: by default, the layers will render in the order you define them 
        //            (so here, terrain is loaded, then decor is placed above it)
        //            See Phaser documentation for how to change layer order!
        const terrainLayer = map.createLayer("terrain-layer", tilesheet, 0, 0);
        const decorLayer = map.createLayer("decor-layer", tilesheet, 0, 0);
    }

    update() {
    }

}
