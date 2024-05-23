import { z } from 'zod';
import { productDto, productStatusDto } from '../../api/dto/product.dto';

export type ProductStatus = z.infer<typeof productStatusDto>;
export type Product = z.infer<typeof productDto>;
