import type { z } from 'zod';
import type { deliveryStatusDto, orderDto, orderStatusDto } from '~/api/dto/order.dto';

export type Order = z.infer<typeof orderDto>;
export type OrderStatus = z.infer<typeof orderStatusDto>;
export type DeliveryStatus = z.infer<typeof deliveryStatusDto>;
