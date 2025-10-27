import { Posts } from 'src/posts/posts.entity';
import { Users } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts, (post) => post.comments)
  post: Posts;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  reactions?: number[] | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  responses?: Comments[] | null;

  @Column({
    type: 'date',
  })
  publishDate: Date;
}
