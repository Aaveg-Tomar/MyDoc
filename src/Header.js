import React from 'react';
import './css/header.css';
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';


 function Header({photoURL}) {
  return (
    <div className='header'>
        <div className='header_logo flex '>
            <img className=' w-28' src='https://img.freepik.com/free-vector/illustration-share-icon_53876-5841.jpg?w=740&t=st=1690865680~exp=1690866280~hmac=1929ee057c1f62c6f81f616076277bcb940ffbbc1a81923d58a3f85b3b2fb45b'/>
            <span>MyDoc</span>
        </div>
        {/* <div className='header_search'>
            <SearchIcon/>
            <input placeholder='search in doc' type='text' />
            <FormatAlignCenterIcon/>
        </div> */}
        <div className='header_icons'>
            <span>
                {/* <AppsIcon/> */}
                <img className='user' src={photoURL} />
            </span>

        </div>
    </div>
  )
}

export default Header;
