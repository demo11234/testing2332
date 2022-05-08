import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'shared/ResponseMessage';
import { Chains } from 'src/chains/entities/chains.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { ILike, In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { FilterDto } from './dto/filter.dto';
import { CreateNftItemDto } from './dto/nft-item.dto';
import { UpdateNftItemDto } from './dto/update.nftItem.dto';
import { NftItem } from './entities/nft-item.entities';
import { Between } from "typeorm";

@Injectable()
export class NftItemService {
    constructor(
        
        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>,
        @InjectRepository(NftItem)
        private readonly nftItemRepository: Repository<NftItem>,
        @InjectRepository(Chains)
        private chainsRepository: Repository<Chains>,

    ){}

    /**
   * @description: This api create the item and returns status
   * @param NftItemDto
   * @param user
   * @returns: create Item
   * @author: vipin
   */
    async createNftItem (user, nftItemDto: CreateNftItemDto): Promise<any>{
        try {
            let nftItem = new NftItem()
            nftItem.walletAddress = user.walletAddress
            nftItem.originalOwner = user.walletAddress
            nftItem.owner = user.walletAddress
            const collection = await this.collectionRepository.findOne({
                where: { id: nftItemDto.collectionId },
            });
            nftItem.collection = collection
            nftItem.description = nftItemDto.description

            const chains = await this.chainsRepository.findOne({
                where: { id: nftItemDto.blockChainId },
            });
            nftItem.blockChain = chains

            nftItem.isExplicit = nftItemDto.isExplicit
            nftItem.externalUrl = nftItemDto.externalUrl
            nftItem.fileUrl = nftItemDto.fileUrl
            nftItem.levels = nftItemDto.levels
            nftItem.properties = nftItemDto.properties
            nftItem.stats = nftItemDto.stats
            nftItem.supply = nftItemDto.supply
            nftItem.isLockable = nftItemDto.isLockable
            nftItem.lockableContent = nftItemDto.lockableContent
            nftItem.fileName = nftItemDto.fileName
            nftItem.timeStamp = Date.now()

            const data = await this.nftItemRepository.save(nftItem);
            if (data) return data;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    /**
   * @description: This api fetch item and returns status
   * @param FilterDto
   * @returns: fetch Item with filters
   * @author: vipin
   */
    async fetchNftItems(filterDto: FilterDto): Promise<any>{
        try{
            const {
                walletAddress, collectionsId, chainsId, categories,priceType,
                status, priceRange, sortBy, limit, page, order: orderBy
            } = filterDto
            let where: any = { walletAddress };
            
            if(collectionsId){
                const collectionId = collectionsId.split(',')
                let x = collectionId.map(s=>s.trim())
                where.collection = collectionsId ? { id: In (x) } : where;
            }

            if(chainsId){
                const chainId = chainsId.split(',')
                let x = chainId.map(s=>s.trim())
                where.blockChain = chainsId  ?  { id: In (x)  } : where;
            }
            // let a = []
            if(status){
                
                const statusArr = status.split(',')
                let x = statusArr.map(s=>s.trim())
                console.log(x)
                if (x.includes('new')){
                    const BetweenDates = () => Between( Date.now() - 1000*60*60*24*1, Date.now() );
                    where.timeStamp = status  ?  BetweenDates() : where;
                }
                // if (x.includes('buynow')){
                //     a.push('buynow') 
                // }
                // if (x.includes('onAuction')){
                //     a.push('onAuction')
                // }
                // if (x.includes('hasOffer')){
                //     a.push('hasOffer')
                // }
                // return a;
            }

            if(categories){
                where.collection = categories ? {categoryID: categories} : where;
            }

            // if(priceType){
            //     const priceValue = priceRange.split(',')
            //     let x = priceValue.map(s=>s.trim())
            //     where.blockChain = priceRange  ? { usdPrice: Between(x[0], x[1]) } : where;
            // }

            let order = {};
            if (sortBy === "date") {
            switch (orderBy) {
                case "asc":
                    order["createdAt"] = "ASC";
                    break;
                case "desc":
                    order["createdAt"] = "DESC";
                    break;
                default:
                    order["id"] = "ASC";
                }
            }
            const data = await this.nftItemRepository.find({
                where,
                order,
                relations: ["collection", "blockChain"],
                skip: (+page - 1) * +limit,
                take: +limit,
            })
            return data;
        }catch (error){
            console.log(error)
            throw new Error(error);
        }
    }
    
    /**
   * @description: This api updates the item and returns status
   * @param id
   * @param UpdateNftItemDto
   * @returns: Update Item
   * @author: vipin
   */
    async updateNftItems(id: string, updateNftItemDto: UpdateNftItemDto): Promise<any>{
        try{   
            let updateNftItem = new NftItem()
            updateNftItem.description = updateNftItemDto.description
            updateNftItem.externalUrl = updateNftItemDto.externalUrl
            updateNftItem.fileName = updateNftItemDto.fileName
            updateNftItem.fileUrl = updateNftItemDto.fileUrl
            updateNftItem.isExplicit = updateNftItemDto.isExplicit
            updateNftItem.isLockable = updateNftItemDto.isLockable
            updateNftItem.levels = updateNftItemDto.levels
            updateNftItem.lockableContent = updateNftItemDto.lockableContent
            updateNftItem.properties = updateNftItemDto.properties
            updateNftItem.stats = updateNftItemDto.stats
            const collection = await this.collectionRepository.findOne({
                where: { id: updateNftItemDto.collectionId },
            });
            updateNftItem.collection = collection

            const update = await this.nftItemRepository.update({id}, updateNftItem)
            if (update)
            return update
        }catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    async findOne(id: string): Promise<any>{
        try{
            const item = await this.nftItemRepository.findOne({id})
            if (item) return item
        }catch (error) {
            throw new Error(error);
        }
    }
}
