import {
  TigrisTopicType,
  TigrisDataTypes,
  TigrisSchema,
} from "@tigrisdata/core/dist/types";

export interface Inventory extends TigrisTopicType {
  productId: string;
  productName: string;
  productDescription: string;
  oldAmount: string;
  newAmount: string;
}

export const inventorySchema: TigrisSchema<Inventory> = {
  productId: {
    type: TigrisDataTypes.STRING,
  },
  productName: {
    type: TigrisDataTypes.STRING,
  },
  productDescription: {
    type: TigrisDataTypes.STRING,
  },
  oldAmount: {
    type: TigrisDataTypes.STRING,
  },
  newAmount: {
    type: TigrisDataTypes.STRING,
  },
};