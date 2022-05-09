import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCollectionsDto } from './dto/create-collections.dto';
import { UpdateCollectionsDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { FilterDto } from './dto/filter.dto';
import { ResponseMessage } from 'shared/ResponseMessage';
import { User } from '../../src/user/entities/user.entity';
// import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    walletAddress: string,
    createCollectionDto: CreateCollectionsDto,
  ) {
    try {
      let collection = new Collection();
      collection.logo = createCollectionDto.logo;
      collection.featureImage = createCollectionDto.featureImage;
      collection.banner = createCollectionDto.banner;
      collection.name = createCollectionDto.name;
      collection.url = createCollectionDto.url;
      collection.description = createCollectionDto.description;
      collection.websiteLink = createCollectionDto.websiteLink;
      collection.categoryID = createCollectionDto.categoryId;
      collection.discordLink = createCollectionDto.discordLink;
      collection.instagramLink = createCollectionDto.instagramLink;
      collection.mediumLink = createCollectionDto.mediumLink;
      collection.telegramLink = createCollectionDto.telegramLink;
      collection.earningFee = createCollectionDto.earningFee;
      collection.blockchain = createCollectionDto.blockchain;
      collection.paymentToken = createCollectionDto.paymentToken;
      collection.displayTheme = createCollectionDto.displayTheme;
      collection.explicitOrSensitiveContent =
        createCollectionDto.explicitOrSensitiveContent;
      collection.owner = walletAddress;

      collection = await this.collectionRepository.save(collection);
      return collection;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(filterDto: FilterDto): Promise<[Collection[], number]> {
    try {
      const {
        take,
        skip,
        earningWalletAddress,
        name,
        status,
        isVerified,
        search,
      } = filterDto;
      const collections = await this.collectionRepository.findAndCount({
        take,
        skip,
      });
      if (collections[0]) {
        collections[0] = collections[0].filter((collection) => {
          collection.isDeleted === false;
        });
        if (earningWalletAddress) {
          collections[0] = collections[0].filter((collection) => {
            collection.earningWalletAddress === earningWalletAddress;
          });
        }
        if (name) {
          collections[0] = collections[0].filter((collection) => {
            collection.name === name;
          });
        }
        if (status) {
          collections[0] = collections[0].filter((collection) => {
            collection.status.toString() === status;
          });
        }

        if (isVerified) {
          collections[0] = collections[0].filter((collection) => {
            collection.isVerified === isVerified;
          });
        }
        if (search) {
          collections[0] = collections[0].filter(
            (collection) =>
              collection.name.includes(search) ||
              collection.description.includes(search) ||
              collection.displayTheme.includes(search),
          );
        }
        return collections;
      } else throw new Error(ResponseMessage.COLLECTIONS_DO_NOT_EXIST);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string, owner: string) {
    try {
      const collection = await this.collectionRepository.findOne({
        where: [{ id: id, isDeleted: false, owner: owner }],
      });
      if (collection) return collection;
      else {
        throw new Error(ResponseMessage.COLLECTION_DOES_NOT_EXIST);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, updateCollectionDto: UpdateCollectionsDto) {
    try {
      const isUpdated = await this.collectionRepository.update(
        { id },
        updateCollectionDto,
      );
      if (isUpdated)
        return { status: 200, msg: 'Collection updated succesfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Function will add current user to the collection watchlist
   * @param walletAddress , wallet address of the current user
   * @param collectionId , collecton id to perform the update
   * @returns Promise
   */
  async addUserInWatchlist(
    walletAddress: string,
    collectionId: string,
  ): Promise<boolean> {
    try {
      const collection = await this.collectionRepository.findOne({
        where: { id: collectionId },
        relations: ['watchlist'],
      });
      if (!collection) return null;

      const user = await this.userRepository.findOne({
        where: {
          walletAddress: walletAddress,
        },
      });
      if (!user) return null;

      if (collection.watchlist) {
        collection.watchlist.push(user);
      } else {
        collection.watchlist = [user];
      }

      await this.collectionRepository.save(collection);

      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async removeUseFromWatchlist(
    walletAddress: string,
    collectionId: string,
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          walletAddress: walletAddress,
        },
      });
      if (!user) return null;

      await this.collectionRepository
        .createQueryBuilder()
        .relation(Collection, 'watchlist')
        .of(collectionId)
        .remove(user.id);

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async getCollectionForUser(walletAddress: string): Promise<Collection[]> {
    try {
      const collections = await this.collectionRepository
        .createQueryBuilder('collection')
        .innerJoinAndSelect(
          'collection.watchlist',
          'watchlist',
          'watchlist.walletAddress = :walletAddress',
          { walletAddress },
        )
        .select([
          'collection.id',
          'collection.logo',
          'collection.featureImage',
          'collection.name',
          'collection.banner',
        ])
        .getMany();

      return collections;
    } catch (error) {
      console.log(error);
    }
  }
}