export const ResponseMessage = {
  USER_DOES_NOT_EXISTS_WITH_GIVEN_WALLET_ADDRESS:
    "User with given wallet Address doesn't exists",
  USER_DOES_NOT_EXISTS_WITH_GIVEN_USERNAME:
    "User with given username doesn't exists",
  USER_EXISTS_WITH_GIVEN_EMAIL_ADDRESS:
    'User with given email address already exists',
  USER_EXISTS_WITH_GIVEN_USER_NAME: 'User with given user name already exists',
  NOTIFICATION_SETTING_UPDATED: 'notification setting of current user updated',
  GET_NOTIFICATION: 'Returns all notification settings of user',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  UNAUTHORIZED: 'Unauthorized',
  CHAIN_DETAILS: 'Chain Details',
  TOKEN_DETAILS: 'Token Details',
  USER_CREATED: 'User has been created',
  USER_LOGGED_IN: 'User has been Logged In',
  UNIQUE_CONSTRAINTS_EMAIL: 'Email already exists',
  BAD_REQUEST_UPDATE_ADMIN: 'Bad request for updating Admin',
  MSG_UPDATE_SUCCESS: 'Admin updated succesfully',
  BAD_REQUEST_VALIDATE: 'Bad request in ValidateCustomer',
  FETCH_ERROR: 'Error in fetching the records',
  UNIQUE_CONSTRAINTS_CATEGORY: 'category already exists',
  DELETE_SUCCESS: 'category deleted successfully',
  BAD_REQUEST_DELETE_CATEGORY: 'Bad request for deleting Category',
  NOT_FOUND_CATEGORY: 'category not found',
  UPDATE_SUCCESS_CATEGORY: 'category updated succesfully',
  BAD_REQUEST_UPDATE_CATEGORY: 'Bad request for updating Category',
  NOT_FOUND: 'logged in user details not found',
  LOGIN_ADMIN: 'login as admin',
  INVALID_CRED: 'Invalid credentials',
  CREATE_DESC_ADMIN: 'creates the account and returns created admin',
  ADMIN_NOT_LOGGED_IN: 'In case admin is not logged in',
  CATEGORY_BY_ID: 'Get category by CategoryId',
  LOGGED_IN_ADMIN: 'Get data about current logged in admin',
  UPDATE_CATEGORY: 'Update Category Data',
  ALL_CATEGORIES: 'get all categories',
  ALL_ADMINS: 'get all Admins',
  DELETE_CATEGORY: 'delete Category',
  DESC_CREATE_CATEGORY: 'creates the category and returns created category',
  UPDATE_ADMIN: 'Update Admin Data',
  ADMIN_NOT_FOUND: 'Admin not found**',
  COLLECTION_CREATED: 'Collection Created',
  COLLECTION_CREATION_FAILED: 'Collection creation failed',
  COLLECTIONS_DO_NOT_EXIST: 'Collections do not exist',
  COLLECTION_DOES_NOT_EXIST: 'Collection does not exist',
  USER_DOES_NOT_OWN_COLLECTION: 'User does not own the collection',
  COLLECTION_DELETED: 'Collection deleted',
  ACTIVITY_CREATED: 'Activity created',
  ACTIVITY_CREATION_FAILED: 'Activity creation failed',
  ACTIVITIES_DO_NOT_EXIST: 'Activities do not exist',
  ACTIVITY_DOES_NOT_EXIST: 'Activity does not exist',
  ACTIVITY_DELETED: 'Activity deleted',
  COLLABORATOR_ADDED: 'Collaborator added',
  COLLABORATOR_REMOVED: 'Collaborator removed',
  WATCHLIST_ADDED: 'User has been added in Watchlist',
  WATCHLIST_REMOVED: 'User has been removed from watchlist',
  COLLECTION_LIST: 'List of Collections',
  OFFER_CREATED: 'Offer created',
  BAD_REQUEST_OFFER_CREATION: 'Bad request for offer creation',
  BAD_REQUEST_OFFER_UPDATE: 'Bad request for offer update',
  OFFER_REMOVED: 'Offer removed successfully',
  OFFERS_DO_NOT_EXIST: 'Offers do not exist',
  OFFER_ALREADY_DELETED: 'Offer already removed',
  USER_DOES_NOT_OWN_OFFER: 'User who sent the request doesnt own the offer',
  ITEM_NOT_FOUND: 'Item not found',
  BAD_REQUEST: 'Bad request',
  USER_DOES_NOT_OWN_ITEM: 'User does not own the item',
  ITEM_ACTIVITIES: 'Item Activities',
  ACTIVITIES: 'Activities',
  UNIQUE_CONSTRAINTS_NAME: 'Name and URL of the collection must be unique',

  COLLECTION_NAME: 'Collection Name is Empty',
  UNIQUE_COLLECTION_CHECK: 'Boolean Values for Collection Name and url',
  OWNER_CANNOT_BE_ADDED_AS_COLLABORATOR:
    'Owner cannot be added in collaborators',
  COLLABORATOR_ADD_FAILED: 'Collaborator addition failed',
  USER_ALREADY_IN_COLLABORATORS: 'User already in collaborators',
  SELECT_COLLECTION: 'Please select a collection',

  AUCTION_DETAILS: 'Auction Details',
  USER_DOSENT_OWN_ALL_ITEM: 'User dosent own all item in collection',
  FAVOURITES_ADDED: 'User has been added in Favourites',
  FAVOURITES_REMOVED: 'User has been removed from Favourites',
  UPDATION_ERROR_FEES: 'Error in updating fees paid',
  FEES_NOT_PAID:
    'Pay firsttime fees. If paid already wait for some time to reflect in blockchain',
  ITEM_IS_FREEZED: 'Can not update item is Freezed',
  ITEM_DELETED: 'Item is deleted',
  ITEM_TRANSFERED: 'Item transfered',
  BAD_REQUEST_TRANSFER: 'Bad request transfer',
  AUCTION_CANCELLED: 'Auction Cancelled',
  AUCTION_CANNOT_BE_CANCELLED: 'Auction cannot be Cancelled',
  ITEMS_LIST: 'List of Items',
  TOKENS_NOT_FOUND: 'Tokens not found',
  SUPPLY_ERROR: 'You dont have enough supply',
  USER_ACTIVITIES: 'User Activities',
  CATEGORY_NOT_FOUND: 'Unable to find category. Please check details.',
  ITEM_TRANSFER_BLOCKCHAIN_ERROR: 'item failed to transfer from blockchain',
  ITEM_DELETE_BLOCKCHAIN_ERROR: 'item failed to delete from blockchain',
  ITEM_UPDATED: 'item updated',
  ITEM_HAS_BEEN_HIDDEN: 'Item has been Hidden',
  ITEM_HAS_BEEN_REMOVED_FROM_HIDDEN: 'Item has been removed from Hidden',
  ITEM_DOES_NOT_BELONG_TO_OWNER:'Item does not belong to owner',

  ITEMS_FAVOURITE_COUNT: 'Items Favourite Count',
  AUCTION_SIGNATURE_UPDATED: 'Auction Signature has been updated',
  OFFER_SIGNATURE_UPDATED: 'Offer Signature has been updated',

  REQUEST_REPORTED: 'request successfully reported',
  ALREADY_REPORTED: 'user have already reported this',
};
