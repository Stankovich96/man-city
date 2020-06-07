import React from 'react';
import PropTypes from 'prop-types';

const formField = props => {
    const { formdata, id, change } = props;
    const { validation, validationMessage, valid, element, config, showLabel, value } = formdata;
    const { label, options } = config;

    const showError = () =>{
        let errorMessage = <div className="error_label">
            {
                validation && !valid ?
                    validationMessage
                : null
            }
        </div>

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (element) {
            case ('input'):
                formTemplate =(
                    <div>
                        {showLabel ?
                            <div className="label_inputs">
                                {label}
                            </div>
                            :null
                        }
                        <input
                        {...config}
                        value={value}
                        onChange={event => change({ event, id })}
                        />
                        { showError()}
                    </div>
                )
                break;
                case ('select'):
                    formTemplate =(
                        <div>
                            {showLabel ?
                                <div className="label_inputs">
                                    {label}
                                </div>
                                :null
                            }
                           <select
                                value={value}
                                onChange={ event => change({ event, id })}
                            >
                                <option value="">
                                    Select one
                                </option>
                                {
                                    options.map( item => {
                                        const {key, value} = item;
                                        return (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    })
                                }
                           </select>
                           { showError()}
                        </div>
                    )

                break;
            default:
                formTemplate = null;
                break;
        }
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

formField.propTypes = { 
    change: PropTypes.func.isRequired,
    formdata: PropTypes.shape({
        validation: PropTypes.object,
        validationMessage: PropTypes.string,
        valid: PropTypes.bool,
        element: PropTypes.string,
        config: PropTypes.shape(({
            label: PropTypes.string,
            options: PropTypes.array,
        })),
        showLabel: PropTypes.bool,
        value: PropTypes.string,
    }).isRequired,
    id: PropTypes.string.isRequired,
}

export default formField;
