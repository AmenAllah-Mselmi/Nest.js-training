import { IsEnum } from "class-validator";
import { typepermis } from "../entities/TypePermis";

export class CreateConductorDto {
    DatePermis: Date;
    @IsEnum(typepermis)
    TypePermis: typepermis;
}
