import {Item} from "@/item";
import {AGED_BRIE, BACKSTAGE_PASSES, CONJURED, MAX_QUALITY, MIN_QUALITY, SULFURAS} from "@/constants";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (this.isSulfuras(item)) {
        return
      }
      if (this.isCommonItem(item)) {
        this.updateCommonItem(item);
      } else {
        this.updateSpecialITem(item);
      }
      item.sellIn--;
    })
  }

  private isSulfuras = (item: Item): boolean => item.name === SULFURAS;

  private isCommonItem = (item: Item): boolean =>
    !this.isAgedBrie(item) && !this.isSulfuras(item) && !this.isBackstagePasses(item);

  private isAgedBrie = (item: Item): boolean => item.name === AGED_BRIE;

  private isBackstagePasses = (item: Item): boolean => item.name.includes(BACKSTAGE_PASSES);

  private updateCommonItem = (item: Item) => {
    this.decreaseQuality(item);

    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }

  private decreaseQuality = (item: Item) => {
    let decoyFactor = this.isConjured(item) ? 2 : 1;
    item.quality -= decoyFactor;
    if (item.quality < MIN_QUALITY) {
      item.quality = MIN_QUALITY
    }
  }

  private updateSpecialITem(item: Item) {
    const qualityFactor = this.getQualityFactor(item);
    this.increaseQuality(item, qualityFactor);
  }

  private increaseQuality = (item: Item, factor: number) => {
    if (factor == 0) {
      item.quality = MIN_QUALITY;
    } else {
      item.quality += factor;
      if (item.quality > MAX_QUALITY) {
        item.quality = MAX_QUALITY;
      }
    }
  }

  private isConjured = (item: Item): boolean => item.name.includes(CONJURED)

  private getQualityFactor(item: Item) {
    if (this.isBackstagePasses(item)) {
      if (item.sellIn < 0) {
        return -item.quality;
      }
      if (item.sellIn <= 5) {
        return 3;
      }
      if (item.sellIn <= 10) {
        return 2;
      }
    }
    return 1;
  }
}
