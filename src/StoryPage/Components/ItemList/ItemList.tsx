import { List, Text, ThemeIcon } from '@mantine/core';
import { BuildingStore, Message, News, Presentation, QuestionMark, Speakerphone, Target, User } from 'tabler-icons-react';
import { getHostName } from './helpers';
import { format } from 'timeago.js';
import './ItemList.scss';

export type Story = {
    id: number,
    score: number,
    type: string,
    title: string,
    time: number,
    by: string,
    descendants: number,
    url?: string,
}

type Props = {
    items: Array<Story>;
}

const iconProps = {
    size: 16,
    strokeWidth: 2,
};

export const ItemList = (props: Props) => {
    const getTypeIcon = (type: string, title: string) =>  {
        switch (type) {
        case 'story':
            if (title.startsWith('Ask HN:')) {
                return <QuestionMark {...iconProps} aria-label={'Ask icon'} />;
            } else if (title.startsWith('Show HN:')) {
                return <Presentation {...iconProps} aria-label={'Show icon'} />;
            } else if (title.startsWith('Tell HN:')) {
                return <Speakerphone {...iconProps} aria-label={'Tell icon'} />;
            } else {
                return <News {...iconProps} aria-label={'News icon'} />;
            }
        case 'job':
            return <BuildingStore {...iconProps} aria-label={'Job icon'} />;
        default:
            return null;
        }
    };
    
    return (
        <List 
            spacing={'md'}   
            classNames={{
                root: 'news-item-list',
                item: 'news-item',
                itemIcon: 'news-item-icon',
                itemWrapper: 'news-item-box',
            }}>
            {props.items.map((item) => {
                return (
                    <List.Item
                        key={item.id}
                        icon={
                            <ThemeIcon color='orange' variant='outline' size={24} radius="xl">
                                {getTypeIcon(item.type, item.title)}
                            </ThemeIcon>
                        }
                    >
                        <div className='news-item-content'>
                            <span className='title-link'>
                                <span>
                                    { item.url ? 
                                        <><a href={item.url}>{item.title}</a> <span className='story-source'>({getHostName(item.url)})</span></>
                                        : item.title}
                                </span>
                          
                            </span>
                            <span className='stats-box'>
                                <div className='comments icon-wrapper'>
                                    <Message {...iconProps} strokeWidth={1} /> {item.descendants}
                                </div>
                            </span>
                            <span className='item-owner icon-wrapper'>
                                <User {...iconProps} color={'orange'}/> {item.by} 
                                <Text size='xs' component='span'>({format(item.time * 1000)})</Text>
                            </span>
                            <span className='item-score icon-wrapper'>
                                <Target {...iconProps} strokeWidth={1} />
                                <Text  component='span' size='sm'>{item.score}</Text>
                            </span>
                           
                        </div>
                    </List.Item>
                );
            })
            }
        </List>
    );
};