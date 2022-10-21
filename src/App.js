import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import SearchInput from './components/SearchInput';
import AllResult from './components/results/AllResult';

function App() {
  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className='flex flex-wrap justify-center relative'>
        <SearchInput />
        <NavigationBar/>
        {/* navigation */}
      </div>
      <Routes>
        <Route exact path="/" element={<Navigate to="/all" />} />
        <Route exact path="/all" element={<AllResult/>}/>
      </Routes>
      {/* 검색 결과 */}
    </div>
  );
}

export default App;
