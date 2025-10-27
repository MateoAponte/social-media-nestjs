import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Activities } from './enums/Activities';
import { Roles } from './enums/Roles';
import { Posts } from 'src/posts/posts.entity';
import { Perfiles } from 'src/perfiles/perfiles.entity';
import { Comments } from 'src/comments/comments.entity';
import { Categories } from 'src/categories/categories.entity';
import { Events } from 'src/events/events.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;
  @Column({
    unique: true,
    length: 100,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    enum: Roles,
    default: Roles.USER,
  })
  rol: Roles;
  @Column({
    type: 'enum',
    enum: Activities,
    array: true,
  })
  activities: Activities[];

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToOne(() => Perfiles, (perfil) => perfil.user)
  @JoinColumn()
  perfil: Perfiles;

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Categories, (category) => category.user)
  categories: Categories[];

  @ManyToMany(() => Events, (events) => events.users)
  @JoinTable()
  events: Events;

  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
