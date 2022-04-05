import { Text } from "@mantine/core";
import { ArrowUp, BuildingStore, News, Presentation, QuestionMark, Star } from "tabler-icons-react";
import { StoryListTypes } from "../Shell";
import './NavigationLinks.scss';

type Props = {
    activeList: StoryListTypes,
    onNavigationChange: (listType: StoryListTypes) => void,
}

export const NavigationLinks = (props: Props) => {
    const iconProps = {
        size: 48,
        strokeWidth: 1,
    };
    return (
        <div className='navigation-links'>
            <div 
                {...props.activeList === StoryListTypes.NEW && {className:'active-list'}} 
                onClick={() => props.onNavigationChange(StoryListTypes.NEW)}>
                <News {...iconProps} aria-label='New items button' />
                <Text size="lg">New</Text>
            </div>
            <div {...props.activeList === StoryListTypes.BEST && {className:'active-list'}}
                onClick={() => props.onNavigationChange(StoryListTypes.BEST)}>
                <Star {...iconProps} aria-label='Best items button' /> 
                <Text size="lg">Best</Text>
            </div>
            <div {...props.activeList === StoryListTypes.TOP && {className:'active-list'}}
                onClick={() => props.onNavigationChange(StoryListTypes.TOP)}>
                <ArrowUp {...iconProps} aria-label='Top items button' />
                <Text size="lg">Top</Text>
            </div>
            <div 
                {...props.activeList === StoryListTypes.ASK  && {className:'active-list'}} 
                onClick={() => props.onNavigationChange(StoryListTypes.ASK)}>
                <QuestionMark {...iconProps} aria-label='Ask items button'/> 
                <Text size="lg">Ask</Text></div>
            <div {...props.activeList === StoryListTypes.SHOW && {className:'active-list'}}
                onClick={() => props.onNavigationChange(StoryListTypes.SHOW)}>
                <Presentation {...iconProps}  aria-label='Show items button'/>
                <Text size="lg">Show</Text>
            </div>
            <div {...props.activeList === StoryListTypes.JOBS && {className:'active-list'}}
                onClick={() => props.onNavigationChange(StoryListTypes.JOBS)}>
                <BuildingStore {...iconProps} aria-label='Jobs items button'/> 
                <Text size="lg">Jobs</Text>
            </div>
        </div>
    );
};
