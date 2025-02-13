(()=>{
    const itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAADcCAMAAAC4YpZBAAAAt1BMVEX///8AAABxcXGzs7O4uLZrJQxKEA/5+fmcVzpycnJsbGxVVVWXl5e7u7l1dXWlpaXAwMA4ODjj4+MdHR0MDAzFxcWBgYGiWjxoIQZlIwtkZGRiIA2Pj49eXl5NERA5FAbU1NQmJiYyEQZMTExDQ0OQkJDv7++goKCVUDRJKRtFGAgwCgrY2NiurqwzHBM/IxciEw0wMDBbHA4fHx9GLSNBIBGLSzE6Pz9JJRWHfn0/AwAgAAAxAADiG7UnAAAE0UlEQVR4nO2d23bbNhBFLVGJrBt1Zx1ZSqSIEu1WTKo4qXv7/++qMWfoCl6u24r0QgCe/QYsPsw2CAxxky8uCCGEEEIIIYQQQgghhBBCCCGEEEJei3RsuNu7juN1mTYEWgYALcOhHpYzWLZdx/FKbHuGbTYUVlJKJ66jqhq0YaM1MIw2KIVqGbUMoyMtPYaW4WCPPneBpk21TEAfxF3DIpwmVctu09CN0KRjVB5cB1cZatlUS3TPYC07tPSeelnGhqYmlGNolnOA1a1jsjwF2SUOJ6FMrYSSo0lTVM5dB1cZhSW6Zy7dc7ClpY/QMgBLa4wd95BQ7NFn7TrG8lj5Mp6lhnGyE3SispR5ytLn7Gl9+8T64i6aMvXSJu2hcuQ61BI8b4nuOUT3pKUnFJbNWlh2DI+WsSk99EuZoQRguZBxprsCXz8bvvWk0OvLrkLe3RrS/LA2+LzypY1484PwCaUV/gLDkRlq5ytU5q5DLUFheWl4tNTuKS/uYIHKyHWoJaAlLf3ieUskFLVcBWP5y41w+0noLQyrfi50sTQ0nAheJhS1fHclaEL5hspekVAMc31xM9cRn0Nh+cZwpS/uZ6t7Znhxu6gcuo74HGhJS7942VISSgCWWN26v34n3FyafHJ5+7OAMXbRjwytzt3mgWnW3hu8POx1j4a6thLKr6jcIqFkSCgxKpeuIz4H3dK7tl7cW02bVvdUy77riM+BlrT0i3pYpo2Z4SXLfmFpHvTTUtG1SWWFPZSxlVD6SCgJKhPXEZ/DE0usuxeWVpMmHqdNWtLSL1LLsmePPlLoZP5bTk7Zx1MzC7nDWtci3YCh92OsTVw0qWyL2e2s+XKEUtdtoKUoLNE9n1q2H7gYoBS7DrUEtKSlXzSthGJb7vBIAJYT2Wk/JJujoTh6kMlZp1zPfskj6wj79z5PVJZWI8ayDT9oycJevsYjc/0LOI2zHE8s5dunBctoje5JS0+gZTiWyT+PPg+WglqunMZZjgNyhn4jrHAZI4Nlplf+5rIaFGnJdcQl6MMyxRHaJSy1nTt4ZI3S1m2gpVBLXTKwLWN0T7XsuQ61BLSkpV8UlrI+0txJKmk9WgqHYEafDe5kLHan1/v0hgb25qN8Z2YtOy/PP/Wtj4N7TSj4ENpZXwUTlI5u4z0P2zK1uqd+BC6ke7bV0suFvf9t6Trgs6ij5b1aYqi1LC8CsNTv2AVuaMT4qadlKncykv1kP5ns1/5b6oWLFkpjbFAnmHRGcmo4yvy31HN4kVrixU2iU2j5vUPLmli2QrHM5XcCt3rhAqXeCvvUcY5bfrAcemypqIKuYOni3VETCs4Ld0OzHD3TPXUfjJbfPbQMxzJ7ybIViqUSNWazxrwdnY6xmlCikCz/FdchVgAtaekX9bDMa2GpN/e0ST/iyt/1WyEcS0W/Cj7KPZQ3sHxPSy+hpevYqsO2fEtLj6Gl69iqg5auY6uOeljObcv3QjiWB/zDod9+/1H4Ivwk/IHtBC+P+zxBJyN/nn70hDcZUcsPtPQfWrqOrTpo6Tq26qCl69iqg5auY6uOelgONvJDel+vZFH9CyzvpW7qOrbK0ZlXcI1oM6JlMNAyHOpiOfubYC0JIYQQQgghhBBCCCGEEEIIIYQQQggh/5m/ACgjqRe8jgG+AAAAAElFaTkSuQmCC";
    ModAPI.meta.title("guns");
    ModAPI.meta.version("v1.0");
    ModAPI.meta.icon(itemTexture);
    ModAPI.meta.description("Requires AsyncSink.");

    ModAPI.require("player");

    function PistolItem() {
        var DamageSourceClass = ModAPI.reflect.getClassByName("DamageSource");
        var creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
        var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var itemSuper = ModAPI.reflect.getSuper(itemClass, (x) => x.length === 1);
        var nmi_ItemPistol = function nmi_ItemPistol() {
            itemSuper(this); //Use super function to get block properties on this class.
            this.$setCreativeTab(creativeMiscTab);
        }

        function entityRayCast(player, world, range) {
            const HEADSHOT_MAX_DISTANCE_FROM_HEAD = 0.72;
            var eyePosition = player.getPositionEyes(0.0);
            var targetPosition = player.rayTrace(range, 0).hitVec;
            var entities = world.getEntitiesWithinAABBExcludingEntity(
                player.getRef(),
                player.getEntityBoundingBox().expand(range, range, range).getRef()
            ).getCorrective().array;
            var closestEntity = null;
            var isHeadshot = false;
            var closestDistance = range;

            // Iterate through all entities to find the one the player is looking at
            for (var i = 0; i < entities.length; i++) {
                if (!entities[i]) {
                    continue;
                }
                var entity = entities[i];

                // Check if the entity's bounding box intersects with the player's ray
                var entityBB = entity.getEntityBoundingBox().expand(0.3, 0.3, 0.3);
                var intercept = entityBB.calculateIntercept(eyePosition.getRef(), targetPosition.getRef());

                if (intercept != null) {
                    var distance = eyePosition.distanceTo(intercept.hitVec.getRef());
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestEntity = entity;
                        isHeadshot = entity.getPositionEyes(0.0).distanceTo(intercept.hitVec.getRef()) < HEADSHOT_MAX_DISTANCE_FROM_HEAD;
                    }
                }
            }

            var rayTraceResult = closestEntity;
            if (rayTraceResult != null){
                return {entity: rayTraceResult, headshot: isHeadshot};
            } else{
                return null;
            }
        }
        ModAPI.reflect.prototypeStack(itemClass, nmi_ItemPistol);
        nmi_ItemPistol.prototype.$onItemRightClick = function ($itemstack, $world, $player) {
            var cactus = DamageSourceClass.staticVariables.cactus;
            var world = ModAPI.util.wrap($world);
            var entityplayer = ModAPI.util.wrap($player);
            var shotentitydata = entityRayCast(entityplayer, world, 50.0);
            if (shotentitydata != null){
                if (world.isRemote) {
                } else {
                    shotentitydata.entity.attackEntityFrom(cactus, 1000 + (1000 * shotentitydata.headshot));
                    if (shotentitydata.headshot) {
                        console.log("H E A D S H O T");
                    }
                    world.playSoundAtEntity(entityplayer.getRef(), ModAPI.util.str("tile.piston.out"), 1.0, 1.8);
                }
            } else if (!world.isRemote) {
                world.playSoundAtEntity(entityplayer.getRef(), ModAPI.util.str("random.click"), 1.0, 1.8);
            }
            return $itemstack;
        }

        async function addGunRecipe(gunItem) {
            var ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
    
            // Define the recipe legend to map characters to items
            var recipeLegend = {
                "I": {
                    type: "item",
                    id: "iron_ingot" // Using dirt blocks
                },
                "C": {
                    type: "block",
                    id: "iron_block" // Using dirt blocks
                },
                "Q": {
                    type: "item",
                    id: "gunpowder" // Using dirt blocks
                },
            };
    
            // Define the crafting grid pattern for the recipe
            var recipePattern = [
                "IIC",
                " QI"
            ];
    
            // Convert the recipe pattern and legend into the required format
            var recipeInternal = [];
            Object.keys(recipeLegend).forEach((key) => {
                recipeInternal.push(ToChar(key));
                var ingredient = (recipeLegend[key].type === "block" ? ModAPI.blocks : ModAPI.items)[recipeLegend[key].id].getRef();
                recipeInternal.push(ingredient);
            });
    
            var recipeContents = recipePattern.flatMap(row => ModAPI.util.str(row));
            var recipe = ModAPI.util.makeArray(ObjectClass, recipeContents.concat(recipeInternal));
    
            var resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4](gunItem, 1);
    
    
            // Register the recipe with CraftingManager
            var craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(craftingManager, resultItem, recipe);
        }

        function internal_reg() {
            var pistol_item = (new nmi_ItemPistol()).$setUnlocalizedName(
                ModAPI.util.str("pistol")
            ).$setMaxStackSize(1);
            itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("pistol"), ModAPI.util.str("pistol"), pistol_item);
            ModAPI.items["pistol"] = pistol_item;
            addGunRecipe(pistol_item);
            return pistol_item;
        }

        if (ModAPI.items) {
            return internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode(PistolItem); 
    var pistol_item = PistolItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", (renderItem)=>{
            renderItem.registerItem(pistol_item, ModAPI.util.str("pistol"));
        });
        AsyncSink.L10N.set("item.pistol.name", "Pistol");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/pistol.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/pistol"
                },
                "display": {
                    "thirdperson": {
                        "rotation": [ 5, 80, -45 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ 1.0, 1.0, 1.0 ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ 1.8, 1.8, 1.8 ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/pistol.png", await (await fetch(
            itemTexture
        )).arrayBuffer());
    });
})();
