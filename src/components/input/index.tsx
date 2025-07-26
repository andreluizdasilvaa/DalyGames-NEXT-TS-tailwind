"use client"

import React, { FormEvent } from "react"
import { BsSearch } from 'react-icons/bs'
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function Input() {
    const [input, setInput] = React.useState("")
    const router = useRouter()

    function handleSearch(event: FormEvent) {
        event.preventDefault()

        if(input === "") {
            toast.warning("Digite algo antes de pesquisar")
            return;
        }

        router.push(`/game/search/${input}`)
    }

    return (
        <form 
            className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between p-2 rounded-lg"
            onSubmit={handleSearch}
        >
            <input
                className="bg-slate-200 outline-none w-11/12"
                type="text"
                placeholder="Procurando algum jogo?..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button type="submit" className="cursor-pointer">
                <BsSearch size={24} color="#ea580c" />
            </button>
        </form>
    )
}