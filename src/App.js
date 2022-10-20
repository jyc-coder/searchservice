import './App.css';
import SearchInput from './components/SearchInput';

function App() {
  return (
    <div className='bg-slate-50 min-h-screen'>
      <div className='flex flex-wrap justify-center relative'>
        <SearchInput/>
        {/* navigation */}
      </div>
      {/* 검색 결과 */}
    </div>
  );
}

export default App;
