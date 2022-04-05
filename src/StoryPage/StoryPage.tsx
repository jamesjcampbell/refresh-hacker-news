import { Alert, LoadingOverlay, Pagination } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import { StoryListTypes } from '../Shell/Shell';
import { ItemList, Story } from './Components';
import { fetchStoryIds, fetchStoryItems } from './storiesApi';

type Props = {
    listType: StoryListTypes
}

export const Stories = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Array<number>>([]);
    const [visibleRows,setVisibleRows] = useState<Array<Story>>([]);
    const [page, setPage] = useState(1);

    const getNewsIds = async (listType: StoryListTypes) => {
        setLoading(true);
        const Ids = await fetchStoryIds(listType);
        setData(Ids);
        setLoading(false);
    }; 
    const changePage =async (page: number) => {
        setLoading(true);
        const start = 10*(page-1);
        const Ids = await fetchStoryItems(data.slice(start, start + 10));
        setVisibleRows(Ids);
        setPage(page);
        setLoading(false);
    };
   
    const getStoryItemDetails = async (data: number[]) => {
        const Ids = await fetchStoryItems(data.slice(0,10));
        setPage(1);
        setVisibleRows(Ids);
    };

    useEffect(() => {
        getNewsIds(props.listType);
    }, [props.listType]);

    useEffect(() => {
        if (data.length > 0 ) {
            getStoryItemDetails(data);
        }
    }, [data]);
    return (
        <div className='story-page'>
            <LoadingOverlay aria-label='fetching items' visible={loading}/>
            {!loading && data.length === 0 && (
                <Alert 
                    icon={<AlertCircle size={16} />} title="Sorry!" color="red"
                >
                    Sorry an error occurred, please try again later...
                </Alert>
            )}
            {!loading && visibleRows.length > 0 && (
                <>
                    <ItemList items={visibleRows} />
                    <Pagination   getItemAriaLabel={(page) => {
                        switch (page) {
                        case 'dots':
                            return 'dots element';
                        case 'prev':
                            return 'previous page button';
                        case 'next':
                            return 'next page button';
                        case 'first':
                            return 'first page button';
                        case 'last':
                            return 'last page button';
                        default:
                            return `${page} page item`;
                        }
                    }}
                    position={'center'}
                    className='story-pagination'
                    total={Math.ceil(data.length / 10)} 
                    initialPage={page
                    } onChange={changePage}/>
                </>
            )}
        </div>
    );
};