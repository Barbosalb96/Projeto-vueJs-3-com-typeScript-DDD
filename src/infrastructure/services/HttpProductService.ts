import axios from "axios";
import type {ProductService} from "@/domain/product/service/ProductService";
import type {ProductEntity} from "@/domain/product/entity/productEntity";

export class HttpProductService implements ProductService {
    private apiUrl = 'http://127.0.0.1:8000/api/products';

    async getAllProducts(product: string): Promise<ProductEntity[]> {
        const url = product ? `${this.apiUrl}?search=${encodeURIComponent(product)}` : this.apiUrl
        const response = await axios.get<ProductEntity[]>(url);
        return response.data;
    }

    async storeProducts(product: ProductEntity): Promise<ProductEntity> {
        const response = await axios.post<ProductEntity>(this.apiUrl, product);
        return response.data;
    }

    async findProduct(id: number): Promise<ProductEntity> {
        const response = await axios.get<ProductEntity>(`${this.apiUrl}/${id}`);
        return response.data;
    }
}
