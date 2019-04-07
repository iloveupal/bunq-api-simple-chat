import React from 'react';
import { shallow } from 'enzyme';

import { ConversationInfoBanner, Name, Type } from '../ConversationInfoBanner';
import UserSmallCircles from 'Modules/chat/components/User/UserSmallCircles';



describe('ConversationInfoBanner', () => {
    it('should match snapshots', () => {
        const component = shallow(
            <ConversationInfoBanner
                data={{
                    conversation: {
                        type: '2',
                        name: 'Test',
                    },
                    users: [{ userid: '1' }, { userid: '2' }],
                }}
            />
        );

        expect(component).toMatchSnapshot();
    });

    it('should render nothing when no data is passed', () => {
        const component = shallow(
            <ConversationInfoBanner
                data={null}
            />
        );

        expect(component.children()).toHaveLength(0);

    });

    it('should render correctly when data is passed', () => {
        const component = shallow(
            <ConversationInfoBanner
                data={{
                    conversation: {
                        type: '2',
                        name: 'Test',
                    },
                    users: [{ userid: '1' }, { userid: '2' }],
                }}
            />
        );

        expect(component.find(Name).at(0).text()).toEqual('Test');
        expect(component.find(Type).at(0).text()).toEqual('Group');
        expect(component.find(UserSmallCircles).at(0).props().users).toEqual([{ userid: '1' }, { userid: '2' }]);
    });
});