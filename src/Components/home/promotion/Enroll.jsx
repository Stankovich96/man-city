import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';

const Enroll = () => {
	const [state, setState] = useState({
		formError: false,
		formSuccess: '',
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email',
				},
				validation: {
					required: true,
					email: true,
				},
				valid: false,
				validationMessage: '',
			},
		},
	});
	const updateForm = (element) => {
		const newFormdata = { ...state.formdata };
		const newElement = { ...newFormdata[element.id] };

		newElement.value = element.event.target.value;

		let valiData = validate(newElement);
		newElement.valid = valiData[0];
		newElement.validationMessage = valiData[1];

		newFormdata[element.id] = newElement;

		setState({
			formError: false,
			formdata: newFormdata,
		});
	};

	const resetFormSuccess = (type) => {
		const newFormdata = { ...state.formdata };

		for (let key in newFormdata) {
			newFormdata[key].value = '';
			newFormdata[key].valid = false;
			newFormdata[key].validationMessage = '';
		}
		setState({
			formError: false,
			formdata: newFormdata,
			formSuccess: type ? 'Congratulations' : 'Already on the database',
		});
		successMessage();
	};

	const successMessage = () => {
		setTimeout(() => {
			setState({
				formSuccess: '',
			});
		}, 2000);
	};
	const submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {};
		let formIsValid = true;

		for (let key in state.formdata) {
			dataToSubmit[key] = state.formdata[key].value;
			formIsValid = state.formdata[key].valid && formIsValid;
		}

		if (formIsValid) {
			firebasePromotions
				.orderByChild('email')
				.equalTo(dataToSubmit.email)
				.once('value')
				.then((snapshot) => {
					if (snapshot.val() === null) {
						firebasePromotions.push(dataToSubmit);
						resetFormSuccess(true);
					} else {
						resetFormSuccess(false);
					}
				});
			// resetFormSuccess();
		} else {
			setState({
				formError: true,
			});
		}
	};
	return (
		<Fade>
			<div className='enroll_wrapper'>
				<form onSubmit={(event) => submitForm(event)}>
					<div className='enroll_title'>Enter your email</div>
					<div className='enroll_input'>
						<FormField
							id={'email'}
							formdata={state.formdata.email}
							change={(element) => updateForm(element)}
						/>
						{state.formError ? (
							<div className='error_label'>Something is wrong, Try again</div>
						) : null}

						<div className='sucess_label'>{state.formSuccess}</div>
						<button onClick={(event) => submitForm(event)}>Enroll</button>
						<div className='enroll_discl'>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
							asperiores repellendus inventore sint assumenda molestiae veniam
							ipsum praesentium harum autem!
						</div>
					</div>
				</form>
			</div>
		</Fade>
	);
};

export default Enroll;
