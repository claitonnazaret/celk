export type TablePropsType = {
    columns: any;
    rows: any;
};

export interface ColumnInterface {
    id: string;
    label: string;
    sort?: boolean;
    minWidth?: number | string;
    width?: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    format?: (value: number | Date) => string;
    parse?: (value: string | boolean, handle?: any) => any;
    actions?: any[];
}

export type DataType = {
    content: [];
    pageable: {
        pageSize: number;
        pageNumber: number;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
};
