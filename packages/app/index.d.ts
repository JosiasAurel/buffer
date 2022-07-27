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
  date: number;
  content: string;
  expiryDate: number;
  isPublic: boolean;
  id: string;
};

declare type BResponse = {
  status: boolean;
  error?: any;
  buffers?: any[];
  buffer?: any;
};

declare type BufferType = "text" | "code";
