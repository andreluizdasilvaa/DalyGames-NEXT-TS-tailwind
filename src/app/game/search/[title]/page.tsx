import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/gameCard";

async function getData(title: string) {
    try {
        const decodeTile = decodeURI(title)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTile}`)
        return res.json()
    } catch (error) {
        return null;
    }
}

type ParamProp = {
    params: { title: string }
}
export default async function Search({ params }: ParamProp) {
    const games: GameProps[] = await getData(params.title)

    return (
        <Container>
            <Input />

            <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos na nossa base:</h1>

            {!games && (
                <p>Esse jogo não foi encontrado...</p>
            )}

            <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {games && games.map((item) => (
                    <GameCard data={item} key={item.id}/>
                ))}
            </section>
        </Container>
    )
}