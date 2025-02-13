import { Type } from "@nestjs/common";
import { typepermis } from "./TypePermis";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Conductor {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    DatePermis: Date;
    @Column({ type:"enum",
        enum:typepermis
    })
    TypePermis:typepermis;
}
