import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingModel } from "./model/booking.entity";

@Module({
    imports: [TypeOrmModule.forFeature([BookingModel])],
    providers: [BookingService],
    controllers: [BookingController]
})
export class BookingModule {}