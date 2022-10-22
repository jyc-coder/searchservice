import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {useQuery} from 'react-query';
import {useLocation} from 'react-router-dom';
import SearchTermRequired from './SearchTermRequired';
import {Oval} from 'react-loader-spinner';
import NoResult from './NoResult';
import ReactPaginate from 'react-paginate';

function NewsResult() {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('q');
  const itemsPerPage = 10;
  const BingSearchapiKey = process.env.REACT_APP_BING_SEARCH_API_KEY;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const {data, isLoading} = useQuery(
    ['newsResult', search],
    () =>
      axios
        .get(`https://image-search10.p.rapidapi.com/index.php`, {
          headers: {
            'X-RapidAPI-Key': `${BingSearchapiKey}`,
            'X-RapidAPI-Host': 'image-search10.p.rapidapi.com',
          },
          params: {
            q: search,
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
    setCurrentItems(data?.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil((data?.data.length ?? 0) / itemsPerPage));
  }, [data?.data,itemOffset]);

  const handlePageClick = useCallback(
    (e) => {
      console.log(e.selected);
      setItemOffset((e.selected * itemsPerPage) % data?.data.length);
    },
    [data?.data?.length]
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
      <div className="flex justify-center items-center flex-wrap m-auto w-[900px]">
        {data?.data.length > 0 ? (
          currentItems?.map(({title, content_url, image}, index) => (
            <a href={content_url} target="_blank" rel="noreferrer" className="p-3 w-36 h-36">
              <img src={image} alt={title} loading="lazy" className="hover:shadow-xl" />
              <p className="w-36 break-words text-sm mt-2 hover:underline">{title.substring(0, 10)}...</p>
            </a>
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

export default NewsResult;
