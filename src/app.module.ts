import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilesModule } from './perfiles/perfiles.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        // synchronize: true,
        // port: 5432,
        // username: 'postgres',
        // password: 'Pes.azul123',
        // host: 'localhost',
        // logging: ['schema', 'error'],
        // database: 'social-media',
        schema: 'public',
        entities: ['dist/**/*.entity.js'],
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        url: 'postgresql://neondb_owner:npg_9l4ezGcJyPuW@ep-summer-dew-a41un8yy.us-east-1.aws.neon.tech/neondb?sslmode=require'
      })
    }),
    PerfilesModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
