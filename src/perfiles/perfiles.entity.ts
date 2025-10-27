import { Users } from 'src/users/users.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Perfiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  photo?: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 100,
  })
  phone: string;

  @Column({
    type: 'date',
  })
  memberSince: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  ubication?: string;

  @OneToOne(() => Users, (user) => user.perfil)
  user: Users;
}
