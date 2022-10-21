import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';
import SearchTermRequired from './SearchTermRequired';
import {Oval} from 'react-loader-spinner';
import NoResult from './NoResult';
import ReactPaginate from 'react-paginate';

function AllResult() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('q');
    const itemsPerPage = 10;
    const BingSearchapiKey = process.env.REACT_APP_BING_SEARCH_API_KEY;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const {data, isLoading} = useQuery(
    ['allResult', search],
    () =>
      axios
        .get(`https://bing-web-search1.p.rapidapi.com/search`, {
          headers: {
            'X-BingApis-SDK': 'true',
                'X-RapidAPI-Key': `${BingSearchapiKey}`,
            'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com',
          },
          params: {
            q: search,
            setLang: 'ko',
            safeSearch: 'Off',
            freshness: 'Day',
            count: '50',
          },
        })
        .then((data) => data?.data),
    {
      refetchOnWindowFocus: false,
      enabled: !!search,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data?.webPages?.value.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((data?.webPages?.value.length ?? 0) / itemsPerPage));
  }, [data?.webPages, itemOffset]);

  const handlePageClick = useCallback(
      (e) => {
          console.log(e.selected)
      setItemOffset((e.selected * itemsPerPage) % data?.webPages?.value.length);
    },
    [data?.webPages?.value.length],
  );
  if (!search) return <SearchTermRequired />;
  if (isLoading)
    return (
      <Oval
        height={100}
        width={100}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass="flex justify-center mt-52"
        visible={true}
        ariaLabel="loading-indicator"
        secondaryColor="#ffffff"
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
    );
  return (
    <>
      <div className="flex flex-col justify-center align-middle m-auto w-[700px]">
        {data?.webPages.value.length > 0 ? (
          currentItems?.map(({url, name, snippet}, index) => (
            <div key={index} className="mt-10">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm">{url.length > 40 ? url.substring(0, 40) : url}</p>
                <p className="text-lg text-blue-700 hover:underline">{name}</p>
                <p className="text-xs">{snippet}</p>
              </a>
            </div>
          ))
        ) : (
          <NoResult />
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        previosLabel="<<"
        pageRangeDisplayed={10}
        pageLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        previousLinkClassName="text-[#22C55E] bg-slate-50 block border solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        breakLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        nextLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        containerClassName="flex ml-auto mr-auto w-fit mt-10 pb-10 select-none"
        activeLinkClassName="z-[3]  text-slate-50 bg-[#22C55E] block border solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        disabledLinkClassName="text-[#6c757d] pointer-events-none bg-slate-50 border-[#dee2e6] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border=[#dee2e6]"
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        pageCount={pageCount}
      />
    </>
  );
}

export default AllResult;
