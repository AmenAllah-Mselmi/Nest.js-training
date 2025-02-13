import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { ConductorModule } from './conductor/conductor.module';
import { User } from './user/entities/user.entity';
import { Vehicule } from './vehicule/entities/vehicule.entity';
import { Conductor } from './conductor/entities/conductor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UserModule, VehiculeModule, ConductorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities:[Vehicule,User],
      synchronize: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hhh', // Use environment variables in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
