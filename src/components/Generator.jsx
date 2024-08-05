import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/workouts';
import Button from './Button';

function Header(props) {
	const { index, title, description } = props;
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-center gap-2">
				<p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-500">
					{index}
				</p>
				<h4 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl">{title}</h4>
			</div>
			<p className="text-sm sm:text-base mx-auto">{description}</p>
		</div>
	);
}

const Generator = (props) => {
	const [showModal, setShowModal] = useState(false);
	const { poison, setPoison, muscle, setMuscle, goal, setGoal, updateWorkout } =
		props;

	function toggleModal() {
		setShowModal(!showModal);
		return;
	}
	function updateMuscles(muscleGroup) {
		if (muscle.includes(muscleGroup)) {
			setMuscle(muscle.filter((val) => val !== muscleGroup));
			return;
		}
		if (muscle.length === 2) {
			setShowModal(false);
		}
		if (muscle.length > 2) {
			return;
		}
		if (poison !== 'individual') {
			setMuscle([muscleGroup]);
			setShowModal(false);
			return;
		}

		setMuscle([...muscle, muscleGroup]);
	}
	return (
		<SectionWrapper
			id="generate"
			header={'generate your workout'}
			title={["It's", 'Huge', "o'clock"]}
		>
			<Header
				index={'01'}
				title={'Pick your poison'}
				description={'Select the workout you wish to endure.'}
			/>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{Object.keys(WORKOUTS).map((type, typeIndex) => {
					return (
						<button
							onClick={() => {
								setMuscle([]);
								setPoison(type);
							}}
							className={
								'bg-slate-950 border-2 py-4 px-4 rounded-lg  hover:border-blue-600 duration-200 ' +
								(type === poison ? 'border-blue-600' : 'border-blue-300')
							}
							key={typeIndex}
						>
							<p className="capitalize">{type.replace('_', ' ')}</p>
						</button>
					);
				})}
			</div>
			<Header
				index={'02'}
				title={'Lock on targets'}
				description={'Select the muscles judged for annihilation.'}
			/>
			<div className="bg-slate-950  border border-solid border-blue-300 rounded-lg flex flex-col  hover:border-blue-600 duration-200">
				<button onClick={toggleModal} className="relative p-3 ">
					<p className="capitalize">
						{muscle.length === 0 ? 'Select muscle groups' : muscle.join(' ')}
					</p>
					<i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
				</button>
				{showModal && (
					<div className="flex flex-col p-3">
						{(poison === 'individual'
							? WORKOUTS[poison]
							: Object.keys(WORKOUTS[poison])
						).map((muscleGroup, muscleGroupIndex) => {
							return (
								<button
									onClick={() => updateMuscles(muscleGroup)}
									className={
										'hover:text-blue-400 duration-200 ' +
										(muscle.includes(muscleGroup) ? 'text-blue-400' : '')
									}
									key={muscleGroupIndex}
								>
									<p className="uppercase">{muscleGroup}</p>
								</button>
							);
						})}
					</div>
				)}
			</div>

			<Header
				index={'03'}
				title={'Become Juggernaut'}
				description={'Select your ultimate objective.'}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{Object.keys(SCHEMES).map((scheme, schemeIndex) => {
					return (
						<button
							onClick={() => {
								setGoal(scheme);
							}}
							className={
								'bg-slate-950 border-2 py-4 px-4 rounded-lg  hover:border-blue-600 duration-200 ' +
								(scheme === goal ? 'border-blue-600' : 'border-blue-300 ')
							}
							key={schemeIndex}
						>
							<p className="capitalize">{scheme.replace('_', ' ')}</p>
						</button>
					);
				})}
			</div>
			<Button func={updateWorkout} text={'Formulate'} />
		</SectionWrapper>
	);
};

export default Generator;
