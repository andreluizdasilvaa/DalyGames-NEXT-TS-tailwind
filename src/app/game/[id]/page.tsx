import Image from "next/image"
import { GameProps } from "@/utils/types/game"
import { redirect } from "next/navigation"
import { Container } from "@/components/container"
import { Label } from "./components/label"
import { GameCard } from "@/components/gameCard"
import { Metadata } from "next"

type ParamProps = {
    params: { id: string }
}

export async function generateMetadata({ params }: ParamProps):Promise<Metadata> {
    try {
        const response:GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { cache: 'no-store' })
        .then((res) => res.json())
        .catch(() => {
            return {
                title: "Daly Games - Descubra jogos incriveis"
            }
        })

        return {
            title: response.title,
            description: `${response.description.slice(0, 100)}...`,
            openGraph: {
                title: response.title,
                images: [response.image_url]
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true
                }
            }
        }
    } catch (error) {
        return {
            title: "Daly Games - Descubra jogos incriveis"
        }
    }
}

async function getData(id:string) {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { cache: 'no-store' })
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

async function getGameSorted() {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store" })
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

export default async function Game({ params }:ParamProps) {
    const game: GameProps = await getData(params.id)
    const sortedGame: GameProps = await getGameSorted()
    
    if(!game) {
        redirect("/")
    }

    return (
        <main className="w-full text-black">
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image 
                    className="object-cover w-full h-80 sm:h-96 opacity-80"
                    src={game.image_url}
                    alt={game.title}
                    priority={true}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                />
            </div>

            <Container>
                <h1>{game.title}</h1>
                <p>{game.description}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Categorias:</h2>

                <div className="flex gap-2 flex-wrap">
                    {game.platforms.map((item) => (
                        <Label name={item} key={item}/>
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-7 mb-2">Plataformas:</h2>
                
                <div className="flex gap-2 flex-wrap">
                    {game.categories.map((item) => (
                        <Label name={item} key={item}/>
                    ))}
                </div>

                <p className="mt-7 mb-2"><strong>Data de lançamento:</strong> {game.release}</p>

                <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
                <div>
                    <GameCard 
                        data={sortedGame}
                    />
                </div>
            </Container>
        </main>
    )
}