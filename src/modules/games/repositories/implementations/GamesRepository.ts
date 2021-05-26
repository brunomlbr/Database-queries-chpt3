import { getRepository, Repository, getConnection } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";
import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private repositoryUser: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.repositoryUser = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :input ", { input: `%${param}%` })
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(`SELECT COUNT(title)
    FROM games`); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repositoryUser
      .createQueryBuilder("users")
      .innerJoin("users.games", "games")
      .where("games.id = :id ", { id })
      .getMany();
    // Complete usando query builder
  }
}
