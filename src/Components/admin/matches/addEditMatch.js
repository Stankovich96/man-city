import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

const AddEditMatch = (props) => {
	const { match, history } = props;
	const { params } = match;
	const { id: matchId } = params;
	const [state, setState] = useState({
		matchId: '',
		formType: '',
		formError: false,
		formSuccess: '',
		teams: [],
		formdata: {
			date: {
				element: 'input',
				value: '',
				config: {
					label: 'Event Date',
					name: 'date_input',
					type: 'date',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			local: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: [],
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
			},
			resultLocal: {
				element: 'input',
				value: '',
				config: {
					label: 'Result Local',
					name: 'result_local_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
			},
			away: {
				element: 'select',
				value: '',
				config: {
					label: 'Select an away team',
					name: 'select_local',
					type: 'select',
					options: [],
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
			},
			resultAway: {
				element: 'input',
				value: '',
				config: {
					label: 'Result Away',
					name: 'result_away_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
			},
			referee: {
				element: 'input',
				value: '',
				config: {
					label: 'Referee',
					name: 'referee_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			stadium: {
				element: 'input',
				value: '',
				config: {
					label: 'Stadium',
					name: 'stadium_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			result: {
				element: 'select',
				value: '',
				config: {
					label: 'Team result',
					name: 'select_result',
					type: 'select',
					options: [
						{ key: 'W', value: 'W' },
						{ key: 'L', value: 'L' },
						{ key: 'D', value: 'D' },
						{ key: 'N/A', value: 'N/A' },
					],
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			final: {
				element: 'select',
				value: '',
				config: {
					label: 'Game Played ?',
					name: 'select_played',
					type: 'select',
					options: [
						{ key: 'Yes', value: 'Yes' },
						{ key: 'No', value: 'No' },
					],
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
		},
	});

	const updateFields = (match, teamOptions, teams, type, matchId) => {
		const newFormdata = {
			...state.formdata,
		};

		for (let key in newFormdata) {
			if (match) {
				newFormdata[key].value = match[key];
				newFormdata[key].valid = true;
			}
			if (key === 'local' || key === 'away') {
				newFormdata[key].config.options = teamOptions;
			}
		}

		setState({
			matchId,
			formType: type,
			formdata: newFormdata,
			teams,
		});
	};

	useEffect(() => {
		const getTeams = (match, type) => {
			firebaseTeams.once('value').then((snapshot) => {
				const teams = firebaseLooper(snapshot);
				const teamOptions = [];

				snapshot.forEach((childSnapshot) => {
					teamOptions.push({
						key: childSnapshot.val().shortName,
						value: childSnapshot.val().shortName,
					});
				});
				updateFields(match, teamOptions, teams, type, matchId);
			});
		};

		if (!matchId) {
			getTeams(false, 'Add Match');
		} else {
			firebaseDB
				.ref(`matches/${matchId}`)
				.once('value')
				.then((snapshot) => {
					const match = snapshot.val();

					getTeams(match, 'Edit Match');
				});
		}
		return () => {
			firebaseTeams.off();
		};
	}, [state, matchId, updateFields]);

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

	const successForm = (message) => {
		setState({
			formSuccess: message,
		});

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

		state.teams.forEach((team) => {
			if (team.shortName === dataToSubmit.local) {
				dataToSubmit['localThmb'] = team.thmb;
			}
			if (team.shortName === dataToSubmit.away) {
				dataToSubmit['awayThmb'] = team.thmb;
			}
		});
		if (formIsValid) {
			if (state.formType === 'Edit Match') {
				firebaseDB
					.ref(`matches/${state.matchId}`)
					.update(dataToSubmit)
					.then(() => {
						successForm('Updated Correctly');
					})
					.catch((e) => {
						setState({ formError: true });
					});
			} else {
				firebaseMatches
					.push(dataToSubmit)
					.then(() => {
						history.push('/admin_matches');
					})
					.catch((e) => {
						setState({ formError: true });
					});
			}
		} else {
			setState({
				formError: true,
			});
		}
	};
	return (
		<AdminLayout>
			<div className='editmatch_dialog_wrapper'>
				<h2>{state.formType}</h2>
				<div>
					<form onSubmit={(event) => submitForm(event)}>
						<FormField
							id={'date'}
							formdata={state.formdata.date}
							change={(element) => updateForm(element)}
						/>

						<div className='select_team_layout'>
							<div className='label_inputs'>Local</div>
							<div className='wrapper'>
								<div className='left'>
									<FormField
										id={'local'}
										formdata={state.formdata.local}
										change={(element) => updateForm(element)}
									/>
								</div>
								<div>
									<FormField
										id={'resultLocal'}
										formdata={state.formdata.resultLocal}
										change={(element) => updateForm(element)}
									/>
								</div>
							</div>
						</div>

						<div className='select_team_layout'>
							<div className='label_inputs'>Away</div>
							<div className='wrapper'>
								<div className='left'>
									<FormField
										id={'away'}
										formdata={state.formdata.away}
										change={(element) => updateForm(element)}
									/>
								</div>
								<div>
									<FormField
										id={'resultAway'}
										formdata={state.formdata.resultAway}
										change={(element) => updateForm(element)}
									/>
								</div>
							</div>
						</div>

						<div className='split_fields'>
							<FormField
								id={'referee'}
								formdata={state.formdata.referee}
								change={(element) => updateForm(element)}
							/>

							<FormField
								id={'stadium'}
								formdata={state.formdata.stadium}
								change={(element) => updateForm(element)}
							/>
						</div>

						<div className='split_fields last'>
							<FormField
								id={'result'}
								formdata={state.formdata.result}
								change={(element) => updateForm(element)}
							/>

							<FormField
								id={'final'}
								formdata={state.formdata.final}
								change={(element) => updateForm(element)}
							/>
						</div>

						<div className='success_label'>{state.formSuccess}</div>
						{state.formError ? (
							<div className='error_label'>Something is wrong</div>
						) : (
							''
						)}

						<div className='admin_submit'>
							<button onClick={(event) => submitForm(event)}>
								{state.formType}
							</button>
						</div>
					</form>
				</div>
			</div>
		</AdminLayout>
	);
};

export default AddEditMatch;
