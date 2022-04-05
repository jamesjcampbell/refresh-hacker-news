
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Shell, StoryListTypes } from "./Shell";
import { act } from "react-dom/test-utils";
import * as api from "../StoryPage/storiesApi";
import { Story } from "../StoryPage/Components";

let items: Array<Story> = [];
const PAGE_HEADER = 'A new look for Hacker News';
describe('Shell', () => {
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
        render(<Shell />);
        expect(screen.getByLabelText('fetching items')).toBeInTheDocument();
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
    });

    it('displays header', async () =>  {
        render(<Shell />);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByText(PAGE_HEADER)).toBeInTheDocument();
    });

    it('displays sidebar', async () =>  {
        render(<Shell />);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByLabelText('New items button')).toBeInTheDocument();
        expect(screen.getByLabelText('Best items button')).toBeInTheDocument();
    });

    it('displays data', async () =>  {
        render(<Shell />);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        expect(screen.getByText(items[1].title)).toBeInTheDocument();
    });

    it('changes data when clicking sidebar item', async () =>  {
        render(<Shell />);
        await waitForElementToBeRemoved(screen.queryByLabelText('fetching items'));
        await screen.findByText(items[0].title);
        act(() => {
            fireEvent.click(screen.getByLabelText('Best items button'));
        });
        expect(api.fetchStoryIds).lastCalledWith(StoryListTypes.BEST);
        expect(screen.getByLabelText('fetching items')).toBeInTheDocument();
    });

    it('changes data when changing page', async () =>  {
        render(<Shell />);
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