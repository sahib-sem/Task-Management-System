import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    dueDate:Date

    @Column({default:false})
    status:boolean

    @Column({type:'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    dateCreated: Date;

    @Column({type:'timestamp' , default: () => 'CURRENT_TIMESTAMP'})
    dateModified:Date;

    @Column()
    userId:number;

    @ManyToOne(()=> User , (user) => user.tasks, {eager:true})
    @JoinColumn({
        name:'userId',
        referencedColumnName:'id'
    })
    user:User;

    

}
