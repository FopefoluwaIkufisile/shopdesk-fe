"use client";

import { Icons } from "@/components/ui/icons";
import {
  toggleProfitExpand,
  toggleSalesExpand,
} from "@/redux/features/table/toggle.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useStore } from "@/store/useStore";
import type { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { TableMeta } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";
import {
  useGetProfitsOfStocksQuery,
  useGetSalesThisWeekQuery,
} from "@/redux/features/sale/sale.api";
import { useGetStocksQuery } from "@/redux/features/stock/stock.api";
import type { Stock } from "./data/schema";
import { EditableCell } from "./editable-cell";
import { ProfitColumnHeader } from "./profit-column/profit-column-header";
import { SalesColumnHeader } from "./sales-column/sales-column-header";

const SalesHeader = ({ table }: { table: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const isSalesExpanded = useSelector(
    (state: RootState) => state.toggleTableState.isSalesExpanded
  );

  return (
    <SalesColumnHeader
      table={table}
      isExpanded={isSalesExpanded}
      toggleExpand={() => dispatch(toggleSalesExpand())}
    />
  );
};

const SalesCell = ({ row }: { row: any }) => {
  const isExpanded = useSelector(
    (state: RootState) => state.toggleTableState.isSalesExpanded
  );

  const { organizationId } = useStore();
  const { data: salesData, isLoading } = useGetSalesThisWeekQuery({
    organization_id: organizationId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.LoadingIcon />
      </div>
    );
  }

  const productSales = salesData?.data?.[String(row.original.product_id)] || {};
  console.log("Matching product sales:", productSales);

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  const filteredSales = weekdays.reduce((acc, day) => {
    console.log(`Sales on ${day}:`, productSales[day]);
    return acc + (productSales[day] ?? 0);
  }, 0);

  if (!isExpanded) {
    return (
      <div className="flex items-center justify-center">{filteredSales}</div>
    );
  }

  return (
    <div className="grid grid-cols-5 w-full">
      {weekdays.map((day) => (
        <div
          key={day}
          className="border-r p-5 last:border-r-0 rounded-none text-sm w-full h-full text-center"
        >
          {productSales[day] ?? 0}
        </div>
      ))}
    </div>
  );
};

const ProfitHeader = ({ table }: { table: any }) => {
  const dispatch: AppDispatch = useDispatch();
  const isProfitExpanded = useSelector(
    (state: RootState) => state.toggleTableState.isProfitExpanded
  );

  const toggleExpand = () => {
    dispatch(toggleProfitExpand());
    table.reset();
  };

  return (
    <ProfitColumnHeader
      table={table}
      isExpanded={isProfitExpanded}
      toggleExpand={toggleExpand}
    />
  );
};

const ProfitCell = ({ row }: { row: any }) => {
  const isExpanded = useSelector(
    (state: RootState) => state.toggleTableState.isProfitExpanded
  );

  const { organizationId } = useStore();
  const { data: profitData, isLoading: isProfitLoading } =
    useGetProfitsOfStocksQuery({
      organization_id: organizationId,
    });

  const { data: stocksData, isFetching: isCostPriceFetching } =
    useGetStocksQuery(organizationId);

  if (isProfitLoading || isCostPriceFetching) {
    return (
      <div className="flex items-center justify-center">
        <Icons.LoadingIcon />
      </div>
    );
  }

  const productProfit =
    profitData?.data?.[String(row.original.product_id)] ?? 0;
  const stockItem = stocksData?.find(
    (stock) => stock.product_id === row.original.product_id
  );

  const productCostPrice = stockItem?.buying_price ?? 0;

  if (!isExpanded) {
    return (
      <div className="flex items-center justify-center">{productProfit}</div>
    );
  }

  return (
    <div className="grid grid-cols-2">
      <div className="p-5 border-r border-solid border-gray-200 rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative text-center">
        {productCostPrice}
      </div>
      <div className="border-none p-5 rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative text-center">
        {productProfit}
      </div>
    </div>
  );
};

export const columns: ColumnDef<Stock>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <div className='h-full p-2 w-full flex items-center justify-center'>
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //         className='trans '
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='absolute left-1/2 -translate-x-1/2 bottom-1/3 -translate-y-1/2'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ITEM NAME" />
    ),
    cell: ({ row, table }) => {
      const value = row.getValue<string>("name");
      const updateSelectedRow = (
        table.options.meta as TableMeta<typeof row.original>
      )?.updateSelectedRow;
      return (
        <EditableCell
          value={value}
          accessorKey="name"
          stockId={row.original.id}
          rowData={row.original}
          updateSelectedRow={updateSelectedRow}
          // Removed onChange as it's not part of EditableCellProps
        />
      );
    },
  },
  {
    accessorKey: "buying_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SELL PRICE" />
    ),
    cell: ({ row, table }) => {
      const value = row.getValue<string>("buying_price");
      const updateSelectedRow = (
        table.options.meta as TableMeta<typeof row.original>
      )?.updateSelectedRow;
      return (
        <EditableCell
          value={value}
          accessorKey="buying_price"
          currency={row.original.currency_code}
          stockId={row.original.id}
          rowData={row.original}
          updateSelectedRow={updateSelectedRow}
          // onChange={(val) => {
          //   row.original.buying_price = Number(val);
          // }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AVAILABLE" />
    ),
    cell: ({ row, table }) => {
      const value = row.original.quantity;
      const updateSelectedRow = (
        table.options.meta as TableMeta<typeof row.original>
      )?.updateSelectedRow;
      return (
        <EditableCell
          value={String(value) || "0"}
          accessorKey="quantity"
          stockId={row.original.id}
          rowData={row.original}
          updateSelectedRow={updateSelectedRow}
          // onChange={(val) => {
          //   row.original.quantity = Number(val);
          // }}
        />
      );
    },
    size: 100,
  },
  {
    accessorKey: "sales",
    header: SalesHeader,
    cell: SalesCell,
    enableSorting: true,
  },
  {
    accessorKey: "profitGroup",
    header: ProfitHeader,
    cell: ProfitCell,
    enableSorting: true,
  },
  {
    id: "actions",
    header: () => {
      return (
        <div
          className="h-full py-5 px-4 flex items-center justify-center bg-transparent hover:bg-black/10 transition-all duration-150 shadow-none cursor-pointer"
          title="Add new Column"
        >
          <div className="py-1.5 px-2">
            <Icons.plus className="shrink-0" />
          </div>
        </div>
      );
    },
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
