import { Categories } from 'src/categories/categories.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Categories, (category) => category.event)
  categories: Categories[];

  @ManyToMany(() => Users, (users) => users.events)
  users: Users[];
}
