import { generateServerBookingReference } from "@/lib/utils/idempotency";

export type BookingStatus =
  | "REQUESTED"
  | "RESERVATION"
  | "BOOKING"
  | "CONFIRMED"
  | "COMPLETED"
  | "DECLINED"
  | "EXPIRED"
  | "CANCELLED"
  | "FAILED";

export type PaymentStatus =
  | "PAYMENT_REQUIRED"
  | "PAYMENT_PENDING"
  | "DEPOSIT_PAID"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export interface BookingRecord {
  id: string;
  bookingReference: string;
  missionId: string;
  quoteId?: string;
  customerId: string;
  operatorId: string;
  operatorName: string;
  aircraftModel: string;
  tailNumber?: string;
  origin: string;
  destination: string;
  departureDate: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  depositAmount: number;
  currency: string;
  cancellationPolicy: string;
  createdAt: string;
}

export class ProductionBookingService {
  async createBookingRequest(data: {
    missionId: string;
    quoteId?: string;
    customerId: string;
    operatorId: string;
    operatorName: string;
    aircraftModel: string;
    origin: string;
    destination: string;
    departureDate: string;
    totalAmount: number;
  }): Promise<BookingRecord> {
    const bookingReference = generateServerBookingReference();
    const record: BookingRecord = {
      id: `bk-${Date.now()}`,
      bookingReference,
      missionId: data.missionId,
      quoteId: data.quoteId,
      customerId: data.customerId,
      operatorId: data.operatorId,
      operatorName: data.operatorName,
      aircraftModel: data.aircraftModel,
      origin: data.origin,
      destination: data.destination,
      departureDate: data.departureDate,
      bookingStatus: "BOOKING",
      paymentStatus: "DEPOSIT_PAID",
      totalAmount: data.totalAmount,
      depositAmount: Math.round(data.totalAmount * 0.2),
      currency: "EUR",
      cancellationPolicy: "80% refund up to 48 hours prior to scheduled departure.",
      createdAt: new Date().toISOString(),
    };

    return record;
  }
}

export const bookingService = new ProductionBookingService();
