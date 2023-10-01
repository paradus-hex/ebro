export interface ExposedMainAPI {
  doThat(data: string): Promise<number>;
}