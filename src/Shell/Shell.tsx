import { useState } from 'react';
import { Stories } from '../StoryPage';
import { AppShell, Navbar, Header, Burger, MediaQuery, Title } from '@mantine/core';
import { NavigationLinks } from './Components/NavigationLinks';
import './Shell.css';

export enum StoryListTypes {
  NEW = 'newstories',
  BEST = 'beststories',
  TOP = 'topstories',
  ASK = 'askstories',
  SHOW = 'showstories',   
  JOBS = 'jobstories'
}

export const Shell = () => {
    const [listType, setListType ] = useState(StoryListTypes.NEW);
    const [opened, setOpened ] = useState(false);
    const handleOnChangeType = (listType: StoryListTypes) => {
        setListType(listType);
    };

    return (
        <AppShell
            padding="md"
            navbar={(
                <Navbar 
                    hiddenBreakpoint='sm' 
                    hidden={!opened} 
                    width={{ sm: 200, lg: 300 }} 
                    height={500}
                    p="m">
                    <Navbar.Section >
                        <NavigationLinks
                            activeList={listType} 
                            onNavigationChange={handleOnChangeType}/>
                    </Navbar.Section>
                </Navbar>)
            }
            header={(
                <Header height={60} p="xs">
                    <div className='header-bar'>
                        <MediaQuery 
                            largerThan={'sm'} 
                            styles={{display: 'none'}}>
                            <Burger 
                                opened={opened}
                                onClick={() => {setOpened(!opened);}}/>
                        </MediaQuery>
                        <Title order={2} >A new look for Hacker News</Title>
                    </div>
                </Header>
            )}
        >
            <Stories listType={listType}/>
        </AppShell>
    );
};
