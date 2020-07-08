import React, { FunctionComponent, useEffect, useState } from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { useStylesPrincipal } from 'styles';
import { ColumnInterface } from 'types/TableTypes';

interface TableHeaderInterface {
    columns: ColumnInterface[];
    func: any;
}

type Order = 'asc' | 'desc';

const TableHeader: FunctionComponent<TableHeaderInterface> = ({ columns, func }) => {
    const principalClass = useStylesPrincipal();
    const [order, orderBy] = useState<{ id: string; order: Order }[]>([]);
    const orderInit: Order = 'asc';

    useEffect(() => {
        const orders = columns
            .filter((col) => col.sort)
            .map(({ id }) => {
                return { id: id, order: orderInit };
            });
        orderBy(orders);
    }, []);

    const sortHandler = (id) => {
        orderBy(
            order.map((o) => {
                return o.id == id ? { id: id, order: o.order == 'asc' ? 'desc' : 'asc' } : o;
            }),
        );
        const sortSearch = order.find((o) => o.id === id);
        if (sortSearch) {
            const ss = `${sortSearch.id},${sortSearch.order}`;
            func(ss);
        }
    };

    const getOrder = (id) => {
        const o1 = order.find((o) => o.id === id);
        return o1 && o1.order ? o1.order : undefined;
    };

    const getOrderId = (id) => {
        const o1 = order.find((o) => o.id === id);
        return o1 && o1.id ? o1.id : undefined;
    };

    return (
        <TableHead>
            <TableRow>
                <>
                    {columns.map((column, index) => (
                        <TableCell
                            key={index}
                            align={column.align}
                            style={{ width: column.width }}
                            sortDirection={getOrderId(column.id) === column.id ? getOrder(column.id) : false}
                        >
                            {column.sort ? (
                                <TableSortLabel
                                    active={true}
                                    direction={getOrder(column.id)}
                                    onClick={() => sortHandler(column.id)}
                                >
                                    {column.label}
                                    {getOrderId(column.id) === column.id ? (
                                        <span className={principalClass.visuallyHidden}>
                                            {getOrder(column.id) === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            ) : (
                                column.label
                            )}
                        </TableCell>
                    ))}
                </>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
