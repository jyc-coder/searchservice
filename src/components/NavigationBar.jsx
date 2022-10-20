import React from 'react'
import {NavLink, useLocation} from 'react-router-dom'

function NavigationBar() {
    const { search } = useLocation();
  return (
    <div className="flex justify-center items-center mt-10 w-full border-2 h-16 border-t-green-500">
      <NavLink to={`/all${search}`} className={({isActive}) => (isActive ? 'text-green-500 m-20' : 'm-20')}>
        통합
      </NavLink>
      <NavLink to={`/news${search}`} className={({isActive}) => (isActive ? 'text-green-500 m-20' : 'm-20')}>
        뉴스
      </NavLink>
      <NavLink to={`/image${search}`} className={({isActive}) => (isActive ? 'text-green-500 m-20' : 'm-20')}>
        이미지
      </NavLink>
    </div>
  );
}

export default NavigationBar
