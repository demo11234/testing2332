import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  Response,
  Put,
} from '@nestjs/common';
import { response } from 'express';
import { ResponseMessage } from 'shared/ResponseMessage';
import { ResponseStatusCode } from 'shared/ResponseStatusCode';
import { ResponseModel } from 'src/responseModel';
import { CollectionsService } from './collections.service';
import { CreateCollectionsDto } from './dto/create-collections.dto';
import { UpdateCollectionsDto } from './dto/update-collection.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilterDto } from './dto/filter.dto';
import { UserWatchlistDto } from './dto/user-watchlist.dto';

@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly collectionService: CollectionsService,
    private readonly responseModel: ResponseModel,
  ) {}

  /**
   * @description: 'This api creates new collection'
   * @param createCollectionDto
   * @returns: Created Collection
   * @author: Ansh Arora
   */
  @Post('create')
  @ApiTags('Collection Module')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Creates a new Collection owned by user who is logged in',
  })
  @ApiResponse({
    status: ResponseStatusCode.CREATED,
    description: ResponseMessage.COLLECTION_CREATED,
  })
  @ApiResponse({
    status: ResponseStatusCode.CONFLICT,
    description: ResponseMessage.COLLECTION_CREATION_FAILED,
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiBearerAuth()
  async create(
    @Body() createCollectionDto: CreateCollectionsDto,
    @Request() request,
    @Response() response,
  ) {
    try {
      const collection = await this.collectionService.create(
        request.user.walletAddress,
        createCollectionDto,
      );
      if (collection) {
        return this.responseModel.response(
          collection,
          ResponseStatusCode.CREATED,
          true,
          response,
        );
      } else {
        return this.responseModel.response(
          ResponseMessage.COLLECTION_CREATION_FAILED,
          ResponseStatusCode.CONFLICT,
          false,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: This apis returns all collections
   * @returns: All collections
   * @author: Ansh Arora
   */
  @Get()
  @ApiTags('Collection Module')
  @ApiOperation({
    summary: 'Find All Collections',
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: 'Returns All Collections',
  })
  @ApiResponse({
    status: ResponseStatusCode.NOT_FOUND,
    description: ResponseMessage.COLLECTIONS_DO_NOT_EXIST,
  })
  async findAll(@Query() filterDto: FilterDto, @Response() response) {
    try {
      filterDto.take = filterDto.take <= 20 ? 20 : filterDto.take;
      if (!filterDto.skip) {
        filterDto.skip === 0;
      }
      const collections = await this.collectionService.findAll(filterDto);
      if (collections) {
        return this.responseModel.response(
          collections,
          ResponseStatusCode.OK,
          true,
          response,
        );
      } else {
        return this.responseModel.response(
          ResponseMessage.COLLECTIONS_DO_NOT_EXIST,
          ResponseStatusCode.NOT_FOUND,
          false,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: This api finds single collection using id
   * @param id
   * @returns: Single collection that matches the id
   * @author: Ansh Arora
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Collection Module')
  @ApiOperation({
    summary: 'Find one collection',
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: 'Single Collection',
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({
    status: ResponseStatusCode.NOT_FOUND,
    description: ResponseMessage.COLLECTION_DOES_NOT_EXIST,
  })
  async findOne(@Param('id') id: string, @Request() req, @Response() response) {
    try {
      const owner = req.user;
      const collection = await this.collectionService.findOne(id, owner);
      if (collection) {
        return this.responseModel.response(
          collection,
          ResponseStatusCode.OK,
          true,
          response,
        );
      } else {
        return this.responseModel.response(
          ResponseMessage.COLLECTION_DOES_NOT_EXIST,
          ResponseStatusCode.NOT_FOUND,
          false,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: This api updates the collection and returns status
   * @param id
   * @param updateCollectionDto
   * @returns: Update Staus
   * @author: Ansh Arora
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Collection Module')
  @ApiOperation({
    summary:
      'Update Collection Details owned by user who is currenlty Logged In',
  })
  @ApiResponse({
    status: ResponseStatusCode.CONFLICT,
    description: ResponseMessage.USER_DOES_NOT_OWN_COLLECTION,
  })
  @ApiResponse({
    status: ResponseStatusCode.NOT_FOUND,
    description: ResponseMessage.COLLECTION_DOES_NOT_EXIST,
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: 'Collection Details',
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionsDto,
    @Response() response,
  ) {
    try {
      const collection = await this.collectionService.findOne(id, req.user.id);
      if (req.user.id === collection.owner) {
        const updatedCollection = await this.collectionService.update(
          id,
          updateCollectionDto,
        );
        if (updatedCollection) {
          return this.responseModel.response(
            updatedCollection,
            ResponseStatusCode.OK,
            true,
            response,
          );
        }
      } else {
        return this.responseModel.response(
          ResponseMessage.USER_DOES_NOT_OWN_COLLECTION,
          ResponseStatusCode.BAD_REQUEST,
          false,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: This api updates the collection and returns status
   * @param id
   * @param updateCollectionDto
   * @returns: Update Staus
   * @author: Ansh Arora
   */
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Collection Module')
  @ApiOperation({
    summary:
      'Soft deletes the Collection owned by user who is currenlty Logged In',
  })
  @ApiResponse({
    status: ResponseStatusCode.CONFLICT,
    description: ResponseMessage.USER_DOES_NOT_OWN_COLLECTION,
  })
  @ApiResponse({
    status: ResponseStatusCode.NOT_FOUND,
    description: ResponseMessage.COLLECTION_DOES_NOT_EXIST,
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: ResponseMessage.COLLECTION_DELETED,
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  async delete(@Request() req, @Param('id') id: string, @Response() response) {
    try {
      const owner = req.user.id;
      const collection = await this.collectionService.findOne(id, owner);
      if (req.user.id === collection.owner) {
        if (collection) {
          collection.isDeleted = true;
          return this.responseModel.response(
            ResponseMessage.COLLECTION_DELETED,
            ResponseStatusCode.OK,
            true,
            response,
          );
        }
      } else {
        return this.responseModel.response(
          ResponseMessage.USER_DOES_NOT_OWN_COLLECTION,
          ResponseStatusCode.BAD_REQUEST,
          false,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: watchlist adds or removes user from watchlist depending upon the value of isWatched
   * @param updateCollectionDto
   * @returns: Update Staus
   * @author: Jeetanshu Srivastava
   */
  @Put('/watchlist')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Collection Module')
  @ApiOperation({
    summary:
      'Add and Removes user wallet address from watchlist of a collection',
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: ResponseMessage.WATCHLIST_ADDED,
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: ResponseMessage.WATCHLIST_REMOVED,
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiBearerAuth()
  async watchlist(
    @Body() userWatchlistDto: UserWatchlistDto,
    @Response() response,
    @Request() request,
  ): Promise<any> {
    try {
      const { isWatched } = userWatchlistDto;
      if (isWatched) {
        const result = await this.collectionService.addUserInWatchlist(
          request.user.walletAddress,
          userWatchlistDto.collectionId,
        );
        return this.responseModel.response(
          result,
          ResponseStatusCode.OK,
          true,
          response,
        );
      } else {
        const result = await this.collectionService.removeUseFromWatchlist(
          request.user.walletAddress,
          userWatchlistDto.collectionId,
        );
        return this.responseModel.response(
          result,
          ResponseStatusCode.OK,
          true,
          response,
        );
      }
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }

  /**
   * @description: getWatchCollections returns the collections present in current user watchlist
   * @returns: Collections
   * @author: Jeetanshu Srivastava
   */
  @Put('/getWatchCollections')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Collection Module')
  @ApiOperation({
    summary: 'Returns Current User Watchlist Collection',
  })
  @ApiResponse({
    status: ResponseStatusCode.OK,
    description: ResponseMessage.COLLECTION_LIST,
  })
  @ApiResponse({
    status: ResponseStatusCode.INTERNAL_SERVER_ERROR,
    description: ResponseMessage.INTERNAL_SERVER_ERROR,
  })
  @ApiBearerAuth()
  async getWatchCollections(
    @Response() response,
    @Request() request,
  ): Promise<any> {
    try {
      const collections = await this.collectionService.getCollectionForUser(
        request.user.walletAddress,
      );
      return this.responseModel.response(
        collections,
        ResponseStatusCode.OK,
        true,
        response,
      );
    } catch (error) {
      return this.responseModel.response(
        error,
        ResponseStatusCode.INTERNAL_SERVER_ERROR,
        false,
        response,
      );
    }
  }
}