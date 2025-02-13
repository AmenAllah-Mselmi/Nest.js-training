import { IsNumber, IsString } from "class-validator";

export class CreateVehiculeDto {
            @IsNumber()
            NbPortes:number;
            @IsNumber()
            Puissance: number;
            @IsNumber()
            Kilometrg: number;
            @IsString()
            Marque: string;
            @IsNumber()
            Type: string;
}