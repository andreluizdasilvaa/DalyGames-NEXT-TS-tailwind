import Image from "next/image"
import { Container } from "@/components/container"
import { Input } from "@/components/input"
import { GameCard } from "@/components/gameCard"
import { GameProps } from "@/utils/types/game"
import Link from "next/link"
import { BsArrowRightSquare } from 'react-icons/bs'

async function getDalygame() {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 } })
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

async function getGamesData() {
    try {
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, { next: { revalidate: 320 } })
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch data")
    }
}

export default async function Home() {
    const dalygame: GameProps = await getDalygame()
    const data: GameProps[] = await getGamesData()

    return (
        <main className="w-full">
            <Container>
                <h1 className="text-center font-bold text-xl mt-3 mb-5">Separamos um jogo exclusivo para você</h1>
                <Link href={`/game/${dalygame.id}`}>
                    <section className="w-full bg-black rounded-lg">
                        <div className="w-full h-150 relative rounded-lg">
                            <div className="flex gap-2 items-center justify-center absolute z-20 bottom-0 p-4">
                                <p className="font-bold text-xl text-white">{dalygame.title}</p>
                                <BsArrowRightSquare size={24} color="#fff"/>
                            </div>

                            <Image
                                src={dalygame.image_url}
                                alt={dalygame.title}
                                priority={true}
                                quality={100}
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
                                className="max-h-150 object-cover rounded-lg opacity-50 transition-all duration-300 hover:opacity-100 "
                            />
                        </div>
                    </section>
                </Link>

                <Input />

                <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>
                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data.map((item) => (
                        <GameCard data={item} key={item.id}/>
                    ))}
                </section>
            </Container>
        </main>
       
    );
}
