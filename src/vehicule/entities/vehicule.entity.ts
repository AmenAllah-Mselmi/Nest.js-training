import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Vehicule {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    NbPortes:number;
    @Column()
    Puissance: number;
    @Column()
    Kilometrg: number;
    @Column()
    Maarque: string;
    @Column()
    Type: string;
    @ManyToOne(type=>User,user=>user.vehicules,{onDelete:"CASCADE"})
    user:User
}
