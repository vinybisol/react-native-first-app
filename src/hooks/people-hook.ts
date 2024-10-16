import axios from 'axios';
import ICustomerInterface from '../model/customer-interface';

const customerHook = () => {

    const url = 'http://192.168.50.200:5142/Customer';

    const getCustomerAsync = async () => {
        return axios.get<ICustomerInterface[]>(url)
            .then(res => res.data)
            .catch(e => {
                console.error('Error on getCustomerAsync', e);
                return [];
            });
    };

    const upsertCustomerAsync = async (customer: any) => {
        await axios.patch(url, customer, { headers: { 'Content-Type': 'application/json' } })
            .catch(e => {
                console.error('Error on upsertCustomerAsync', e);
            });
    };

    const deleteCustomerAsync = async (customer: ICustomerInterface) => {
        const deleteUrl = `${url}/${customer.id}`;
        await axios.delete(deleteUrl)
            .catch(e => {
                console.error('Error on deleteCustomerAsync', e);
            });
    };

    return { getCustomerAsync, upsertCustomerAsync, deleteCustomerAsync };
};

export default customerHook;