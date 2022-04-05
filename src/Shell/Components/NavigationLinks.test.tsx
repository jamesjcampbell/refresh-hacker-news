import { fireEvent, render, screen } from "@testing-library/react";
import { StoryListTypes } from "../Shell";
import { NavigationLinks } from "./NavigationLinks";

const commonProps = {
    activeList: StoryListTypes.ASK,
    onNavigationChange: jest.fn(),
};

describe('NavigationLinks', () => {
    it('displays the navigation links', () => {
        render(<NavigationLinks {...commonProps}/>);
        expect(screen.getByText('New')).toBeInTheDocument();
        expect(screen.getByText('Best')).toBeInTheDocument();
        expect(screen.getByText('Top')).toBeInTheDocument();
        expect(screen.getByText('Ask')).toBeInTheDocument();
        expect(screen.getByText('Show')).toBeInTheDocument();
        expect(screen.getByText('Jobs')).toBeInTheDocument();
    });

    it('clicking on link calls onNavigationChange with correct links', () => {
        render(<NavigationLinks {...commonProps}/>);
        fireEvent.click(screen.getByText('New'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.NEW); 
        fireEvent.click(screen.getByText('Best'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.BEST);
        fireEvent.click(screen.getByText('Top'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.TOP);
        fireEvent.click(screen.getByText('Ask'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.ASK);
        fireEvent.click(screen.getByText('Show'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.SHOW);
        fireEvent.click(screen.getByText('Jobs'));
        expect(commonProps.onNavigationChange).lastCalledWith(StoryListTypes.JOBS);
    });
});