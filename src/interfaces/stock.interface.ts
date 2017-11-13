export class Stock {
  lasttrade: number;
  netchange: number;
  percentchange: number;
  currency: number;
  name: string;
  reutername: string;
  isincreasing: number;
  checkinc() {
    if (this.netchange > 0) {
      this.isincreasing = 1;
    } else if (this.netchange < 0) {
      this.isincreasing = -1;
    } else if (this.netchange === 0) {
      this.isincreasing = 0;
    }
  }
}
