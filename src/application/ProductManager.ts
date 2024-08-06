import {HttpProductService} from "@/infrastructure/services/HttpProductService";
import type {ProductEntity} from "@/domain/product/entity/productEntity";


export class ProductManager {
    constructor(
        private HttpProductService: HttpProductService
    ) {
    }

    async getProducts(product: string): Promise<ProductEntity[]> {
        return await this.HttpProductService.getAllProducts(product);
    }

    async storeProducts(product: ProductEntity): Promise<ProductEntity> {
        return await this.HttpProductService.storeProducts(product);
    }

    async findProductById(id: number): Promise<ProductEntity> {
        return await this.HttpProductService.findProduct(id);
    }
}
