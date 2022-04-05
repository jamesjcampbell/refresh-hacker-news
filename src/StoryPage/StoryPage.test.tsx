
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { StoryListTypes } from "../Shell/Shell";
import { Stories } from "./StoryPage";
import { Story } from "./Components";
import { act } from "react-dom/test-utils";
import * as api from "./storiesApi";

let items: Array<Story> = [];
const commonProps = {
    listType: StoryListTypes.BEST,
};

describe('Stories', () => {
    beforeEach(() => {
        const defaultTime = Date.now()/ 1000;
        items = [
            {id: 1, score: 1, descendants: 1, title: 'First story', url: 'www.example.com', by: 'User 1', type: 'story', time: defaultTime},
            {id: 2, score: 1, descendants: 1, title: 'Second story', by: 'User 2', type: 'story', time: defaultTime },
        ];

        jest.spyOn(api, 'fetchStoryIds').mockResolvedValue(Promise.resolve([1,2,3,4,5,6,7,8,9,10,11]));
        jest.spyOn(api, 'fetchStoryItems').mockResolvedValue(Promise.resolve(items));
    });

    it('displays loading screen', async () =>  {
        render(<Stories {...commonProps}/>);
        expect(screen.getByLabelText('fetching items')).toBeInTheDocument();
    });

    it('displays returned items in the list', async () =>  {
        render(<Stories {...commonProps}/>);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByText(items[1].title)).toBeInTheDocument();
    });

    it('displays correct pagination controls', async () =>  {
        render(<Stories {...commonProps}/>);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByLabelText('previous page button')).toBeInTheDocument();
        expect(screen.getByLabelText('1 page item')).toBeInTheDocument();
        expect(screen.getByLabelText('2 page item')).toBeInTheDocument();
        expect(screen.queryByLabelText('3 page item')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('dots element')).not.toBeInTheDocument();
        expect(screen.getByLabelText('next page button')).toBeInTheDocument();
    });

    it('loads when changing page', async () =>  {
        render(<Stories {...commonProps}/>);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        act(() => {
            fireEvent.click(screen.getByLabelText('2 page item'));
        });
        expect(screen.getByLabelText('fetching items')).toBeInTheDocument();
    });

    it('disables correct pagination controls', async () =>  {
        render(<Stories {...commonProps}/>);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByLabelText('previous page button')).toBeDisabled();
        act(() => {
            fireEvent.click(screen.getByLabelText('2 page item'));
        });
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByLabelText('next page button')).toBeDisabled();
    });
});