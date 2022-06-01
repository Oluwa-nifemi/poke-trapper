import "@testing-library/jest-dom/extend-expect";
import {rest} from "msw"
import {setupServer} from "msw/node"

const server = setupServer(
    rest.get(`${process.env.REACT_APP_API_URL}pokemon`, (req, res, ctx) => {
        return res(ctx.json({
            results: [
                {
                    name: "bulbasaur",
                    url: "https://pokeapi.co/api/v2/pokemon/1/"
                },
                {
                    name: "ivysaur",
                    url: "https://pokeapi.co/api/v2/pokemon/2/"
                },
                {
                    name: "venusaur",
                    url: "https://pokeapi.co/api/v2/pokemon/3/"
                }
            ]
        }))
    }),
    rest.get(`${process.env.REACT_APP_API_URL}pokemon/bulbasaur`, (req, res, ctx) => {
        return res(ctx.json({
            "base_experience": 64,
            "height": 7,
            "moves": [
                {
                    "move": {
                        "name": "razor-wind",
                        "url": "https://pokeapi.co/api/v2/move/13/"
                    }
                },
                {
                    "move": {
                        "name": "swords-dance",
                        "url": "https://pokeapi.co/api/v2/move/14/"
                    }
                }
            ],
            "name": "bulbasaur",
            "species": {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
            },
            "sprites": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            },
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "grass",
                        "url": "https://pokeapi.co/api/v2/type/12/"
                    }
                },
                {
                    "slot": 2,
                    "type": {
                        "name": "poison",
                        "url": "https://pokeapi.co/api/v2/type/4/"
                    }
                }
            ],
            "weight": 69
        }))
    })
)

beforeAll(() => server.listen())

afterAll(() => server.close())
afterAll(() => server.resetHandlers())
