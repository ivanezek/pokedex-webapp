import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, PokemonCard, Search } from './pages';

export const AppRouter = () => {
  return (
    <Routes>
            <Route index element={ <Home/> } />
            <Route path="pokemon/:name" element={ <PokemonCard/> } />
            <Route path="search" element={ <Search /> } />
        <Route path="*" element={ <Navigate to="/" /> }/>
    </Routes>
  )
}
