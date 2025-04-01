import type { Sale } from '../components/columns';

export function processDataIntoGroups(data: Sale[]) {
  // Group data by time without re-sorting
  const groupedByTime = data.reduce(
    (acc, item) => {
      const key = `${item.date} ${item.time}`;
      if (!acc[key]) {
        acc[key] = {
          timeKey: key,
          items: [],
          total: {
            id: `total-${key}`,
            date: item.date,
            time: item.time,
            itemName: 'Total',
            quantitySold: 0,
            sellPrice: 0,
            profit: 0,
          },
        };
      }
      acc[key].items.push(item);
      acc[key].total.quantitySold += item.quantitySold;
      acc[key].total.sellPrice += item.sellPrice * item.quantitySold;
      acc[key].total.profit += item.profit || 0;
      return acc;
    },
    {} as Record<string, { timeKey: string; items: Sale[]; total: Sale }>
  );

  // Convert to array and maintain order from the input data
  return Object.values(groupedByTime);
}
