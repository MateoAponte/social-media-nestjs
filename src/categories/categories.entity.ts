import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Subcategories } from './enum/Subcategories';
import { Users } from 'src/users/users.entity';
import { Events } from 'src/events/events.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Subcategories,
    array: true,
  }) // De este modo la DB ya entiende que es una lista de subcategorias
  subcategories: Subcategories[];

  @ManyToOne(() => Users, (user) => user.categories)
  user: Users;

  @ManyToOne(() => Events, (event) => event.categories)
  event: Event;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;
}
