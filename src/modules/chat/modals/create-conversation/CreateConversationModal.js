import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { Input, Switch, MultipleSelect, Button, ButtonRow } from 'Ui';

import { getUsersArray } from 'Modules/chat/domains/users/UsersSelectors';
import { getUserId } from 'Modules/chat/domains/users/UsersPropGetters';
import { closeModal } from 'Modules/chat/actions/ModalActions';
import { createConversation } from 'Modules/chat/actions/ConversationsActions';
import {
    CONVERSATION_TYPE__GROUP,
    CONVERSATION_TYPE__PERSONAL,
} from 'Modules/chat/domains/conversations/ConversationsConstants';

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

const CONVERSATION_TYPES = [CONVERSATION_TYPE__PERSONAL, CONVERSATION_TYPE__GROUP];

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
        onSubmitForm: PropTypes.func.isRequired,
        onCloseModal: PropTypes.func.isRequired,
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

    canSubmit = () => {
        return (
            this.state.type === CONVERSATION_TYPE__GROUP &&
            this.state.name &&
            this.state.participants.length
        ) || (
            this.state.type === CONVERSATION_TYPE__PERSONAL &&
            this.state.participants.length
        );
    };

    submitForm = () => {
        if (
            this.state.type === CONVERSATION_TYPE__GROUP &&
            this.state.name &&
            this.state.participants.length
        ) {
            this.props.onSubmitForm(this.state);
        }

        if (
            this.state.type === CONVERSATION_TYPE__PERSONAL &&
            this.state.participants.length
        ) {
            this.props.onSubmitForm({
                type: 'personal',
                participants: this.state.participants,
            });
        }
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
                { this.state.type === CONVERSATION_TYPE__GROUP && (
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
                        <Button
                            onClick={this.props.onCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            primary
                            isDisabled={!this.canSubmit()}
                            onClick={this.submitForm}
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

const mapDispatchToProps = (dispatch) => ({
    onCloseModal: () => dispatch(closeModal()),
    onSubmitForm: ({ name, type, participants }) => dispatch(createConversation({ name, type, participants })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateConversationModal);