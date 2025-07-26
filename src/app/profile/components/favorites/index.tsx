"use client"
import React from 'react'
import { FiEdit, FiX } from 'react-icons/fi'


export function FavoriteCard() {
    const [input, setInput] = React.useState("")
    const [showInput, setShowInput] = React.useState(false)
    const [gameName, setGameName] = React.useState("")

    function handleButton() {
        setShowInput(value => !value)
        if(input !== "") {
            setGameName(input)
        }

        setInput("")
    }
    
    return (
        <div className="w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col">   
            {showInput ? (
                <div className='flex items-center justify-center gap-3'>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        className='w-full rounded-md h-8 text-black px-2 bg-white outline-none'
                    />
                    <button className='cursor-pointer ' onClick={handleButton}>
                        <FiX size={24} color='#fff'/>
                    </button>
                </div>
            ) : (
                <button 
                    onClick={handleButton}
                    className='cursor-pointer self-start hover:scale-110 duration-200 transition-all'
                >
                    <FiEdit size={24} color='#fff' />
                </button>
            )}

            {gameName && (
                <div className='flex flex-wrap gap-1'>
                    <span className='text-white'>Jogo favorito: </span>
                    <p className='font-bold text-white break-words'>{gameName}</p>
                </div>
            )}

            {!gameName && (
                <p className='font-bold text-white'>Adiciona jogo</p>
            )}
        </div>
    )
}