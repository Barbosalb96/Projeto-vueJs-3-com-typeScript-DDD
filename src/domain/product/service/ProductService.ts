import type {ProductEntity} from "@/domain/product/entity/productEntity";

export interface ProductService {
    getAllProducts(product: string): Promise<ProductEntity[]>;

    storeProducts(product: ProductEntity): Promise<ProductEntity>;
}
