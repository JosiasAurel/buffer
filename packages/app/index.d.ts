declare type BufferType = {
  key: string;
  buffer: string;
  date: string;
  owner: string;
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
