import { Comments } from 'src/comments/comments.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    type: 'date',
  })
  publishDate: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  visualMediaContent?: string;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments?: Comments[] | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  reactions?: number[] | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  shared?: number[] | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  saved?: number[] | null;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;

  @DeleteDateColumn()
  deletedDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;
}
