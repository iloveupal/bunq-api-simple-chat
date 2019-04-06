import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    height: 300px;
    flex: 1 1 auto;
    overflow-y: scroll;
    display: flex;
    flex-flow: column nowrap;
`;

class MultipleSelect extends PureComponent {
    static propTypes = {
        options: PropTypes.array.isRequired,
        value: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    handleItemClick = (option) => {
        const isSelected = this.props.value.includes(option);

        const newArray = isSelected
            ? this.props.value.filter(item => item !== option)
            : this.props.value.concat([ option ]);

        this.props.onChange(newArray);
    };

    render() {
        return (
            <Container>
                {this.props.options.map((option) => {
                    const isSelected = this.props.value.includes(option);

                    return this.props.renderItem({
                        option,
                        isSelected,
                        onClick: () => this.handleItemClick(option),
                    });
                })}
            </Container>
        );
    }
}

export default MultipleSelect;