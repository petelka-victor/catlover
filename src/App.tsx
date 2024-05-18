import React from 'react';
import { HomePage } from './pages/home.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CatModal } from './components/cat-modal.component';
import { BreedPage } from './pages/breed.page';
import { BreedModal } from './components/breed-modal.component';
import { Header } from './components/header.component';
import { FavoritePage } from './pages/favorite.page';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BreedModal />
      <CatModal />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed" element={<BreedPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </BrowserRouter>
  );
};
