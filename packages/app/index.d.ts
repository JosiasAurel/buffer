declare type BufferParam = {
  ownerHash: string;
  publicKey: string;
  type: string;
  content: string;
  isPublic: boolean;
};

declare type Buffer = {
  owner: string;
  publicOwner: string;
  type: string;
  date: Date;
  content: string;
  expiryDate: Date;
  isPublic: boolean;
  id: string;
};

declare type BResponse = {
  status: boolean;
  error?: any;
  buffers?: any[];
};
