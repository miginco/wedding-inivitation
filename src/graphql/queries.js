"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPictures = exports.getPicture = void 0;
exports.getPicture = `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
      id
      createdAt
      updatedAt
    }
  }
`;
exports.listPictures = `
  query ListPictures(
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
