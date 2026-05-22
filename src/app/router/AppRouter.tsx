import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ApplicationPage } from '@/pages/ApplicationPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};
