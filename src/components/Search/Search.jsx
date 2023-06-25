import Tippy from '@tippyjs/react/headless';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import './search.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountItem from '../AccountItem';
import { makeRequest } from '../../httpRequest';

function Search() {
    const {t}= useTranslation()
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        // if (!debounceValue.trim()) {
        //     setSearchResult([]);
        //     return
        // }
        // setLoading(true);
        const fetchApi = async () => {
            // setLoading(true);
            if (searchValue) {
                const result = await makeRequest.post(
                    '/search?value=' + searchValue
                );
                setSearchResult(result.data);
            }
        };
        fetchApi();
    }, [searchValue]);
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className='search-result' tabIndex='-1' {...attrs}>
                    <PopperWrapper>
                        <h3>Account</h3>
                        {searchResult &&
                            searchResult.map((result) => (
                                <Link
                                    to={`profile/${result.id}`}
                                    key={result.id}
                                    className='link'
                                >
                                    <AccountItem data={result} />
                                </Link>
                            ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className='search'>
                <button>
                    <SearchOutlinedIcon />
                </button>
                <input
                    type='text'
                    placeholder={t("search")}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
            </div>
        </Tippy>
    );
}

export default Search;
