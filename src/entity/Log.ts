import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: Date;

    @ManyToOne(() => User, user => user.log)
    user: User
}
