import { render, screen } from "@testing-library/react";
import { ItemList, Story } from "./ItemList";

const commonProps:{items: Array<Story>} = {
    items: []
};

describe('ItemList', () => {
    beforeEach(() => {
        const defaultTime = Date.now()/ 1000;
        commonProps.items = [
            {id: 1, score: 1, descendants: 1, title: 'First story', url: 'www.example.com', by: 'User 1', type: 'story', time: defaultTime},
            {id: 2, score: 1, descendants: 1, title: 'Second story', by: 'User 2', type: 'story', time: defaultTime },
            {id: 3, score: 1, descendants: 1, title: 'Third story', url: 'www.example.com', by: 'User 3', type: 'story', time: defaultTime },
            {id: 4, score: 1, descendants: 1, title: 'Forth story', url: 'www.example.com', by: 'User 1', type: 'story', time: defaultTime }
        ];
    });
    it('displays all items in the list', () => {
        render(<ItemList {...commonProps}/>);
        expect(screen.getByText(commonProps.items[0].title)).toBeInTheDocument();
        expect(screen.getByText(commonProps.items[1].title)).toBeInTheDocument();
        expect(screen.getByText(commonProps.items[2].title)).toBeInTheDocument();
        expect(screen.getByText(commonProps.items[3].title)).toBeInTheDocument();
    });

    it('displays user names for items in the list', () => {
        render(<ItemList {...commonProps}/>);
        expect(screen.getAllByText(commonProps.items[0].by)).toHaveLength(2);
        expect(screen.getByText(commonProps.items[1].by)).toBeInTheDocument();
        expect(screen.getByText(commonProps.items[2].by)).toBeInTheDocument();
    });

    it('displays times in readable manner', () => {
        commonProps.items[0].time = (Date.now() - (5 * 60 * 1000))/1000;
        render(<ItemList {...commonProps}/>);
        expect(screen.getByText(/5 minutes ago/)).toBeInTheDocument();
    });

    it('displays score and comments', () => {
        commonProps.items[0].score = 300;
        commonProps.items[0].descendants = 500;
        render(<ItemList {...commonProps}/>);
        expect(screen.getByText('300')).toBeInTheDocument();    
        expect(screen.getByText('500')).toBeInTheDocument();
    });

    it('displays domain name for urls', () => {
        commonProps.items[0].url = 'https://www.example.com/test?with=params';
        render(<ItemList {...commonProps}/>);
        expect(screen.getByText(/www.example.com/)).toBeInTheDocument();
    });

    it('handles invalid urls', () => {
        commonProps.items[0].url = 'ThisIsNotAURL';
        render(<ItemList {...commonProps}/>);
        expect(screen.queryByText(/ThisIsNotAURL/)).not.toBeInTheDocument();
    });

    describe('display icons', () => {
        it('displays correct icon for each type', () => {
            commonProps.items[0].type ='story';
            commonProps.items[1].type ='job';
            render(<ItemList items={[commonProps.items[0], commonProps.items[1]]}/>);
            expect(screen.getByLabelText('News icon')).toBeInTheDocument();
            expect(screen.getByLabelText('Job icon')).toBeInTheDocument();
        });

        it('displays correct icon for Tell story subtype', () => {
            commonProps.items[0].type ='story';
            commonProps.items[0].title ='Tell HN: tell';
            render(<ItemList items={[commonProps.items[0], commonProps.items[1]]}/>);
            expect(screen.getByLabelText('Tell icon')).toBeInTheDocument();
        });

        it('displays correct icon for Show story subtype', () => {
            commonProps.items[0].type ='story';
            commonProps.items[0].title ='Show HN: show';
            render(<ItemList items={[commonProps.items[0], commonProps.items[1]]}/>);
            expect(screen.getByLabelText('Show icon')).toBeInTheDocument();
        });

        it('displays correct icon for Ask story subtype', () => {
            commonProps.items[0].type ='story';
            commonProps.items[0].title ='Ask HN: ask';
            render(<ItemList items={[commonProps.items[0], commonProps.items[1]]}/>);
            expect(screen.getByLabelText('Ask icon')).toBeInTheDocument();
        });
    });
});