import { Vehicule } from "src/vehicule/entities/vehicule.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({unique:true})
    email:string;
    @Column()
    password:string;
    @OneToMany(type => Vehicule, vehicule => vehicule.user,{cascade:true})
    vehicules:Vehicule[]
}
