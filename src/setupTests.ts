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
)

beforeAll(() => server.listen())

afterAll(() => server.close())
afterAll(() => server.resetHandlers())
