import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const InputComponent = styled.input`
    flex: 1 1 auto;
    height: 40px;
    background-color: #333;
    border-radius: 5px;
    border: none;
    padding: 0 15px;
    font-size: 15px;
    color: white;
    
    &:focus {
        outline: none;
    }
`;

export default class Input extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    };

    render () {
        const { value, onChange, ...rest } = this.props;

        return (
            <InputComponent
                value={value}
                onChange={this.handleChange}
                {...rest}
            />
        );
    }
}