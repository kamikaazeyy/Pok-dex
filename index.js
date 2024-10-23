require('dotenv').config();
const axios = require('axios');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const pokeArray = [];

async function getPokemon() {
    for (let i = 901; i <= 905; i++) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const poke = response.data;
            
            const processedName = poke.species.name.split(/-/).map((name) => {
                return name[0].toUpperCase() + name.substring(1);
            }).join(" ")
                .replace(/^Mr M/, "Mr. M")
                .replace(/^Mime Jr/, "Mime Jr.")
                .replace(/^Mr R/, "Mr. R")
                .replace(/mo O/, "mo-o")
                .replace(/Porygon Z/, "Porygon-Z")
                .replace(/Type Null/, "Type: Null")
                .replace(/Ho Oh/, "Ho-Oh")
                .replace(/Nidoran F/, "Nidoran♀")
                .replace(/Nidoran M/, "Nidoran♂")
                .replace(/Flabebe/, "Flabébé");

            const sprite = poke.sprites.front_default || poke.sprites.other['official-artwork'].front_default;
            const bulbURL = `https://bulbapedia.bulbagarden.net/wiki/${processedName.replace(" ", "_")}_(Pokémon)`;
            
            const typesArray = poke.types.map(type => ({ "name": type.type.name }));

            const pokeData = {
                "name": processedName,
                "number": poke.id,
                "types": typesArray,
                "hp": poke.stats[0].base_stat,
                "height": poke.height,
                "weight": poke.weight,
                "attack": poke.stats[1].base_stat,
                "defense": poke.stats[2].base_stat,
                "special-attack": poke.stats[3].base_stat,
                "special-defense": poke.stats[4].base_stat,
                "speed": poke.stats[5].base_stat,
                "Sprite": sprite,
                "Artwork": poke.sprites.other['official-artwork'].front_default,
                "bulbURL": bulbURL
            };
            
            pokeArray.push(pokeData);
            console.log(`Fetched ${pokeData.name} from PokeAPI`);
        } catch (error) {
            console.error(`Error fetching Pokemon ${i}:`, error.message);
        }
    }
    
    await createNotionPages();
}

async function createNotionPages() {
    for (let pokemon of pokeArray) {
        console.log(`Sending data to Notion for ${pokemon.name}`);
        
        try {
            const flavorResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.number}`);
            const flavorData = flavorResponse.data;

            // Handle flavor text entries safely
            const flavorTextEntry = flavorData.flavor_text_entries.find(({ language: { name } }) => name === "en");
            const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/\n|\f|\r/g, " ") : "No flavor text available";

            // Handle category safely
            const categoryEntry = flavorData.genera.find(({ language: { name } }) => name === "en");
            const category = categoryEntry ? categoryEntry.genus : "No category available";

            // Handle generation safely
            const generation = flavorData.generation ? flavorData.generation.name.split(/-/).pop().toUpperCase() : "Unknown generation";

            // Add data to the pokemon object
            pokemon['flavor-text'] = flavorText;
            pokemon.category = category;
            pokemon.generation = generation;

            console.log(`Fetched flavor info for ${pokemon.name}.`);

            const response = await notion.pages.create({
                "parent": {
                    "type": "database_id",
                    "database_id": process.env.NOTION_DATABASE_ID
                },
                "cover": {
                    "type": "external",
                    "external": { "url": pokemon.Artwork }
                },
                "icon": {
                    "type": "external",
                    "external": { "url": pokemon.Sprite }
                },
                "properties": {
                    "Name": {
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": pokemon.name
                                }
                            }
                        ]
                    },
                    "No": {
                        "number": pokemon.number
                    },
                    "HP": {
                        "number": pokemon.hp
                    },
                    "Attack": {
                        "number": pokemon.attack
                    },
                    "Defense": {
                        "number": pokemon.defense
                    },
                    "Sp. Attack": {
                        "number": pokemon['special-attack']
                    },
                    "Sp. Defense": {
                        "number": pokemon['special-defense']
                    },
                    "Height": {
                        "number": pokemon.height
                    },
                    "Weight": {
                        "number": pokemon.weight
                    },
                    "Speed": {
                        "number": pokemon.speed
                    },
                    "Type": {
                        "multi_select": pokemon.types
                    },
                    "Generation": {
                        "select": {
                            "name": pokemon.generation
                        }
                    },
                    "Category": {
                        "rich_text": [
                            {
                                "type": "text",
                                "text": {
                                    "content": pokemon.category
                                }
                            }
                        ]
                    }
                },
                "children": [
                    {
                        "object": "block",
                        "type": "quote",
                        "quote": {
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": pokemon['flavor-text']
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "object": "block",
                        "type": "bookmark",
                        "bookmark": {
                            "url": pokemon.bulbURL
                        }
                    }
                ]
            });
            console.log(`Successfully added ${pokemon.name} to Notion`);
        } catch (error) {
            console.error(`Error adding ${pokemon.name} to Notion:`, error.body || error.message);
        }
    }
}

getPokemon().catch(error => console.error("Main error:", error));