export default function MovieBudget({ budget, fees }) {
	return (
		<div className="text-gray-400 text-sm space-y-1">
			{budget?.value && (
				<p>
					Бюджет: {budget.value} {budget.currency}
				</p>
			)}
			{fees?.russia?.value && (
				<p>
					Сборы Россия: {fees.russia.value} {fees.russia.currency}
				</p>
			)}
			{fees?.usa?.value && (
				<p>
					Сборы США: {fees.usa.value} {fees.usa.currency}
				</p>
			)}
			{fees?.world?.value && (
				<p>
					Сборы Мир: {fees.world.value} {fees.world.currency}
				</p>
			)}
		</div>
	);
}
