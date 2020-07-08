import { AxiosService } from './AxiosService';

const URL = '/uf';

const listAll = async (path: string, search: string, page?: string) => {
    return AxiosService.get(`${URL}${path}?search=${search ? search : ''}&${page}`);
};

const save = async (data: any) => {
    return AxiosService.post(`${URL}`, data);
};

const deletar = async (id: number) => {
    return AxiosService.delete(`${URL}/${id}`);
};

export const UnidadeFederativaService = {
    listAll,
    save,
    deletar,
};
