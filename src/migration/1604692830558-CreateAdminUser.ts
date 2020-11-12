import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entity/User";

export class CreateAdminUser1604692830558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.username = "FabioDijkshoorn";
        user.password = "UseYourImagination";
        user.firstname = "Fabio";
        user.lastname = "Dijkshoorn";
        user.hashPassword();
        user.role = "Admin";
        user.subscription = "";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM user u WHERE u.username = 'FabioDijkshoorn'");
    }

}
