import { useEffect, useState } from 'react';
import _ from 'lodash';
import style from './app.module.css';
import { SortSelect } from './components/index.js';

const sortOption = [
	{
		value: 'priceASC',
		label: 'price по возрастанию',
		sort: (product) => {
			return product.slice().sort((itemA, itemB) => itemA.price - itemB.price);
		},
	},
	{
		value: 'priceDESC',
		label: 'price по убыванию',
		sort: (product) => {
			return product.slice().sort((itemA, itemB) => itemB.price - itemA.price);
		},
	},
	{
		value: 'titleASC',
		label: 'title по возрастанию',
		sort: (product) => {
			return _.orderBy(product, ['title'], ['asc']);
		},
	},
	{
		value: 'titleDESC',
		label: 'title по убыванию',
		sort: (product) => {
			return _.orderBy(product, ['title'], ['desc']);
		},
	},
];

export const App = () => {
	const [data, setData] = useState([]);
	const [sortBy, setSortBy] = useState({ path: 'price', order: 'asc' });
	const [sortSign, setSortSign] = useState('PriceASC');

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((response) => response.json())
			.then((products) => {
				setData(products);
			});
	}, []);

	const sortedData = _.orderBy(data, sortBy.path, sortBy.order);

	const onSort = (item) => {
		// первый тип сортировки - самый стандартный
		setSortBy((prevState) => {
			if (prevState.order === 'desc') {
				return {
					...prevState,
					order: 'asc',
				};
			} else {
				return {
					...prevState,
					order: 'desc',
				};
			}
		});
	};

	useEffect(() => {
		const findSortOption = sortOption.find(
			(optionSort) => optionSort.value === sortSign,
		);
		if (findSortOption) {
			setData(findSortOption.sort(sortedData));
		}
	}, [sortSign]);

	return (
		<div className={style.app}>
			<h1>App</h1>
			<SortSelect
				value={sortSign}
				options={sortOption}
				onChange={({ target }) => setSortSign(target.value)}
			/>
			<ul>
				{data.map((good) => (
					<li key={good.id}>
						<div>{good.title}</div>
						<strong>{good.price}</strong>
					</li>
				))}
			</ul>
			<div className={style.button}>
				<button onClick={onSort}>Sort Data</button>
			</div>
		</div>
	);
};
