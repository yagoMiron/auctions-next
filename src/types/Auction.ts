type Auction = {
  id: number;
  created_at: string;
  finished_at?: string;
  title: string;
  description: string;
  minutos: number;
  photo_url: string;
  starting_bid: number;
  highest_bid?: number;
  highest_bidder?: string;
  status: string;
};

export default Auction;
