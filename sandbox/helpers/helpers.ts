import {DataTable} from "../../src/component-types/DataTable";

export const simulateDataTableData = (): DataTable => {
    //TODO: in progress
    return {
        list: {
            current_page: 1,
            first_page_url: '',
            last_page_url: null,
            prev_page_url: '',
            next_page_url: null,
            data: [],
            from: null,
            to: null,
            last_page: null,
            links: [],
            path: '',
            per_page: 10,
            total: 10,
        },
        columns: [
            {
                alias: 'name',
                selector: 'user.name',
                dataType: 'text',
                header: 'Name',
                searchable: true,
            },
            {
                alias: 'email',
                selector: 'user.email',
                dataType: 'text',
                header: 'Email Address',
                searchable: true,
            },
        ],
        searchable: true,
        term: '',
    };
};