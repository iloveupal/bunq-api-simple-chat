import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { Input, Switch, MultipleSelect, Button, ButtonRow } from 'Ui';
import { getUsersArray } from 'Modules/chat/domains/users/UsersSelectors';
import { getUserId } from 'Modules/chat/domains/users/UsersPropGetters';

import SelectableUserListItem from 'Modules/chat/components/User/SelectableUserListItem';


const Container = styled.div`
    width: 500px;
    height: 700px;
    background-color: #222;
    padding: 30px;
    
    display: flex;
    flex-flow: column nowrap;
`;

const FormElement = styled.div`
    padding-bottom: 30px;
`;

const FormElementTitle = styled.div`
    font-family: sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 12px;
    color: white;
`;

const FormElementComponent = styled.div`
    padding: 15px 0;
    display: flex;
`;

const Title = styled.div`
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 40px;
`;

const CONVERSATION_TYPES = ['group', 'personal'];

function renderUsersInMultiselect ({ option, isSelected, onClick }) {
    return (
        <SelectableUserListItem
            data={option}
            isSelected={isSelected}
            onClick={onClick}
            key={getUserId(option)}
        />
    );
}


class CreateConversationModal extends PureComponent {
    static propTypes = {
        users: PropTypes.array.isRequired,
    };

    state = {
        type: 'group',
        name: '',
        participants: [],
    };

    createFormChangeFunction = (prop) => {
        return (newValue) => {
            this.setState({
                [prop]: newValue,
            });
        };
    };

    render() {
        return (
            <Container>
                <Title>New Conversation</Title>
                <FormElement>
                    <FormElementTitle>Conversation Type</FormElementTitle>
                    <FormElementComponent>
                        <Switch
                            options={CONVERSATION_TYPES}
                            value={this.state.type}
                            onChange={this.createFormChangeFunction('type')}
                        />
                    </FormElementComponent>
                </FormElement>
                { this.state.type === 'group' && (
                    <FormElement>
                        <FormElementTitle>Name</FormElementTitle>
                        <FormElementComponent>
                            <Input
                                placeholder={'Enter conversation name...'}
                                value={this.state.name}
                                onChange={this.createFormChangeFunction('name')}
                            />
                        </FormElementComponent>
                    </FormElement>
                )}
                <FormElement>
                    <FormElementTitle>Participants</FormElementTitle>
                    <FormElementComponent>
                        <MultipleSelect
                            options={this.props.users}
                            value={this.state.participants}
                            renderItem={renderUsersInMultiselect}
                            onChange={this.createFormChangeFunction('participants')}
                        />
                    </FormElementComponent>
                </FormElement>
                <FormElement>
                    <ButtonRow>
                        <Button>
                            Cancel
                        </Button>
                        <Button
                            primary
                        >
                            Create
                        </Button>
                    </ButtonRow>
                </FormElement>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    users: getUsersArray(state),
});

export default connect(mapStateToProps)(CreateConversationModal);