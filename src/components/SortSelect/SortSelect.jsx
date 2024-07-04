export const SortSelect = ({ options, value, onChange }) => {
	return (
		<div>
			<label htmlFor="sortSelect"> Сортировка </label>
			<select name="" id="sortSelect" value={value} onChange={onChange}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};
