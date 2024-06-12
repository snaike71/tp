import { Transform } from "class-transformer";
import { Column } from "typeorm";

export class ReportDto {
    @Column()
    approved: boolean
    @Column()
    price: number
    @Column()
    model: string
    @Column()
    year: number
    @Column()
    lng: number
    @Column()
    lat: number
    @Column()
    mileage: number

    @Column()
    userId: number
 
}