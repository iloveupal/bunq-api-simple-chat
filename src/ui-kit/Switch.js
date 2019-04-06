import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Container = styled.div`
    flex: 1 1 auto;
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
`;

const Option = styled.div`
    flex: 1 1 auto;
    height: 40px;
    background-color: ${(props) => props.selected ? '#333' : '#222'};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
    color: white;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1.5px;
    cursor: pointer;
`;

class Switch extends PureComponent {
    static propTypes = {
        options: PropTypes.array.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    };

    render() {
        return (
            <Container>
                { this.props.options.map((option) => (
                    <Option
                        selected={option === this.props.value}
                        onClick={() => this.props.onChange(option)}
                        key={option}
                    >
                        { option }
                    </Option>
                )) }
            </Container>
        );
    }
}


export default Switch;