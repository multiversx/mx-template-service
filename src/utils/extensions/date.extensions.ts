Date.prototype.isToday = function (): boolean {
  return this.toISODateString() === new Date().toISODateString();
};

Date.prototype.toISODateString = function (): string {
  return this.toISOString().slice(0, 10);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface Date {
  toISODateString(): string;
  isToday(): boolean;
}
